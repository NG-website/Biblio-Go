import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailValid } from "../functions/login.js";
import { ip, resetAttempt } from "./tryLogin.js";
dotenv.config();

const authMiddleware = async (req, res, next) => {
    console.log("arriver")
    //verif si ip appel meme email
    const verifLogin = ip.filter((d) => {
        return d.email === req.body.email
    })
    //trop de tentative
    const timeout = verifLogin[0].attemptCount * 1000


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
        console.log("user",user)
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
        console.log(userValid)
        if (!userValid) {
            setTimeout(() => {
                return res.status(401).json({ error: "Identifiants incorrects" });
            }, timeout)
            return
        };

        if (userValid) {
            console.log(userValid)
            if (user.role == true) {
                const tokenAdmin = jwt.sign(
                    { date: new Date().toJSON(), ip: ip, userId: user.id },
                    process.env.SECRET_KEY_JWT,
                    { expiresIn: "12h" }
                )
                const addAdminToken = await userModel.update(
                    { tokenAdmin: tokenAdmin },
                    { where: { id: user.id } }
                );
                console.log(addAdminToken)
            }


            let token;
            if (remember === true) {
                token = jwt.sign(
                    { id: user.id, user: user.email },
                    process.env.SECRET_KEY_JWT,
                    { expiresIn: '30d' }
                );
                resetAttempt(verifLogin.attemptCount = 0)
            } else if (remember === false) {
                token = jwt.sign(
                    { id: user.id, user: user.email },
                    process.env.SECRET_KEY_JWT,
                    { expiresIn: '24h' }
                );
                resetAttempt(verifLogin.attemptCount = 0)
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
            console.log(req.user)

            next()
        }
    } catch (err) {
        return res.status(500).json({ error: "Erreur serveur" });
    }
}
export default authMiddleware