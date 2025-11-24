import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import sendMail from "../utils/nodemailer.js"
import generateTokenRandom, { IncrementeDate } from "../utils/functions.js"
import { Op } from "sequelize"

const userController = {
    async All(req, res) {
        try {
            const all = await userModel.findAll({})
            res.status(200).json(all)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Id(req, res) {
        try {
            const { id } = req.body
            const user = await userModel.findOne({ where: { id: id } });
            const userInfo = { name: user.name, email: user.email, address: user.address, postalCode: user.postalCode, country: user.country, phone: user.phone, abonement: user.abonement, abonementType: user.abonementType }
            res.status(200).json(userInfo)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Create(req, res) {
        // console.log("aaa")
        try {
            const token = generateTokenRandom(16)
            // console.log(token)
            const name = req.body.name
            const email = req.body.email
            const password = req.body.password
            const address = req.body.address
            const postalCode = req.body.postalCode
            const country = req.body.country
            const role = req.body.role || false
            const hash_ = await bcrypt.hash(password, 10)
            const data = { name: name, email: email, password: hash_, address: address, postalCode: postalCode, country: country, actif: false, tokenValidation: token, durationValidation : IncrementeDate(new Date()), role : role}
            const create = await userModel.create(data)
            console.log(create.id)
            const link = `http://localhost:3000/user/comfirm-account?token=${encodeURIComponent(token)}${create.id}`
            await sendMail("mr-gerardnicolas@hotmail.fr", "inscription", [req.body.name, link])
            res.status(200).json("ok")
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async ComfirmAccount(req, res) {
        //console.log("query",req.query.token)
        try {
           const query =  req.query.token
            const token =  query.slice(0, 16)
            console.log(token)
            const id = query.slice(16)
            console.log(id)
            const user = await userModel.findOne({ where: { id: id}})
            if(!user){
                res.json("user false")
            }
           const tokenValid = user.tokenValidation === token && user.durationValidation > new Date()
           //console.log("token valid",tokenValid)
            // gerer le token timeout
            if (tokenValid) {
                const activeAccount = await userModel.update(
                    { actif: true, tokenValidation: null, durationValidation : null },
                    { where: { id: id } }
                )
                if (activeAccount[0] === 1) {
                    res.redirect('http://localhost:5173/login')
                }else{
                    res.json('ereur base de données update user')
                }
            }else{
                res.json("token false")
            }

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async Update(req, res) {
        // const data = {
        //     name: req.body.userData.userName,
        //     email: req.body.userData.userEmail,
        //     address: req.body.userData.userAddress,
        //     postalCode: req.body.userData.userPostal,
        //     country: req.body.userData.userCountry,
        //     phone: req.body.userData.userPhone
        // }
        const data = req.body.data
        const id = req.body.id

        try {
            const update = await userModel.update(
                { ...data },
                { where: { id: id } }
            );
            res.status(200).json(update)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async UpdatePassword(req, res) {
        try {
            const id = req?.session?.user?.userId

            const currentPassword = req.body.data.currentPassword
            const user = await userModel.findOne({ where: { id: id } });
            const passwordValid = await bcrypt.compare(currentPassword, user.password)
            console.log(passwordValid)
            if (!passwordValid) {
                return res.status(400).json("mot de passe actuel invalide");
            }
            if (passwordValid) {
                const newPassword = await bcrypt.hash(req.body.data.newPassword, 10)
                const update = await userModel.update(
                    { password: newPassword },
                    { where: { id: id } }
                );
                console.log(update)
                res.status(200).json(update)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async CreateNewPassword(req, res) {
        try {
            const { email } = req.body
            const userExist = await userModel.findAll({ where: { email } })
            console.log("userExist", userExist.length)
            if (userExist.length != 0) {
                //sendMail with custom token 
                res.status(200).json("Un lien de réinitialisation a été envoyé par mail.")
            } else {
                res.status(404).json("L’adresse email n'existe pas.")
            }
        } catch (error) {
            return res.status(500).json("Une erreur est survenue. Réessayez plus tard.")
        }
    },
    async Delete(req, res) {
        try {
            const { id } = req.body
            console.log(req.body)
            const destroy = await userModel.destroy({ where: {id:id }})
            res.status(200).json(destroy)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
async Search(req, res) {
  console.log(req.body);
  try {
    const books = await userModel.findAll({
      where: {
        name: {
          [Op.like]: `${req.body.data}%`  // recherche qui commence par req.body.data
        }
      }
    });
    res.status(200).json([books]);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}
}
export default userController