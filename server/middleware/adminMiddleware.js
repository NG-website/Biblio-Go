import jwt, { decode } from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../models/userModel.js';
import e from 'cors';
dotenv.config()

const adminMiddleware = async (req, res, next) => {
    console.log("admin middle",req.ip)
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token)

    const decode =  jwt.decode(token)

    const expired = new Date(decode?.exp * 1000)
    console.log(expired)
    const isValide = expired > new Date()
    if (!isValide) {
        res.status(404).json("token expiree")
    }

    if (isValide) {
        const admin = await userModel.findOne({ where: { id: decode.id, email: decode.user } })
        
        const decodeBack = await jwt.decode(admin.tokenAdmin)
        
        const expiredBack = new Date(decodeBack.exp * 1000)
   console.log(expiredBack)

        const isValideBack = expiredBack > new Date()
        if (!isValideBack) {
            res.status(404).json("token non valide")
        }

        const sameIp = decodeBack.ip === req.ip
        console.log("decode",decodeBack)
        console.log("decode.ip",decodeBack.ip)
          console.log(req.ip)
        if (!sameIp) {
            res.status(403).json("ip unautorized")
        }
      

        const tokenAdmin = jwt.sign(
            { ip: req.ip, userId: decode.id },
            process.env.SECRET_KEY_JWT,
            { expiresIn: 15 * 60 }
        )
        console.log("new token")
        const addAdminToken = await userModel.update(
            { tokenAdmin: tokenAdmin },
            { where: { id: decode.id } }
        );
    }
    next()
}
export default adminMiddleware