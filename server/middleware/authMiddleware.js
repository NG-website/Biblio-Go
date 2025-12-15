import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailValid } from "../functions/login.js";
import { ip, resetAttempt } from "./tryLogin.js";
dotenv.config();

const authMiddleware = async (req, res, next) => {
    console.log("auth middle",req.ip)
    // //verif si ip appel meme email
    // const verifLogin = ip.filter((d) => {
    //     return d.email === req.body.email
    // })
    // //trop de tentative
    // const timeout = verifLogin[0].attemptCount * 1000
        console.log(req.url)

    const { email, password, remember } = req.body;
console.log(req.body)
    if (!email || !password) {
        return res.status(400).json({ error: "Veuillez entrer email et mot de passe" });
    };

    if (!emailValid(email)) {
        return res.status(400).json({ error: "Format d'email invalide" });
    };


    try {
        const user = await userModel.findOne({ where: { email:email } });

        if (!user) {
            setTimeout(() => {
                return res.status(400).json({ error: "Identifiants incorrects" });
            }, timeout)
            return
        };
        if(user.tokenValidation != null){
            return res.status(401).json({ error: "Merci de validez votre compte par email" });
        }
        const userValid = await bcrypt.compare(password, user.password)

        if (!userValid) {
            setTimeout(() => {
                return res.status(401).json({ error: "Identifiants incorrects" });
            }, timeout)
            return
        };

        if (userValid) {
           
             if (user.role == true) {
                 console.log("user.role === admin ...............")
                 const tokenAdmin = jwt.sign(
                    { ip: req.ip, userId: user.id },
                    process.env.SECRET_KEY_JWT,
                    { expiresIn: 15 * 60 }
                )
                console.log("token admin ",tokenAdmin)
                const addAdminToken = await userModel.update(
                    { tokenAdmin: tokenAdmin },
                    { where: { id: user.id } }
                );
                console.log("update admin ",addAdminToken)
            }


            let token;
            if (remember === true) {
                token = jwt.sign(
                    { id: user.id, user: user.email },
                    process.env.SECRET_KEY_JWT,
                    { expiresIn: 30 * 24 * 60 * 60 }
                );
                resetAttempt(verifLogin.attemptCount = 0)
            } else if (remember === false) {
                token = jwt.sign(
                    { id: user.id, user: user.email },
                    process.env.SECRET_KEY_JWT,
                    { expiresIn: 12 * 60 * 60 }
                );
               // resetAttempt(verifLogin.attemptCount = 0)
            } else {
                return res.status(400).json({ error: "Requête invalide." });
            }

            req.user = {
                token: token,
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                abonnement: user.abonnement,
                abonnementType: user.abonnementType,
                role: user.role
            }

            next()
        }
    } catch (err) {
        return res.status(500).json({ error: "Erreur serveur" });
    }
}
export default authMiddleware