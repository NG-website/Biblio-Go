import jwt, { decode } from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../models/userModel.js';
import e from 'cors';
dotenv.config()

const adminMiddleware = async(req, res, next) => {

//     const token = req.headers["authorization"]?.split(" ")[1];
//    // console.log(token)

//     const decode = jwt.decode(token)
//    // console.log( decode)
//     //console.log(new Date(decode.exp).toLocaleDateString(), new Date(decode.exp).toLocaleTimeString())
//     const expired = new Date(decode.exp)*1000 < new Date()
//     console.log(new Date())
// console.log(expired)
// console.log(new Date(decode.exp*1000))
//     if(!expired){
//         res.status(404).json("token expiree")
//     }
//     if(decode){
//         const admin = await userModel.findOne({where:{id: decode.id, email: decode.user}})
//         //console.log(admin)

//         if(admin){
//            // console.log(admin.tokenAdmin)
//             const decodeBack = jwt.decode(admin.tokenAdmin)
//             //console.log(decodeBack)
//             console.log(new Date(decodeBack.exp*1000))
//             const expiredBack = new Date(decodeBack.exp)*1000 < new Date()
//             console.log(expiredBack)
//             if(!expiredBack){
//                 res.status(404).json("token expiree")
//             }
//             const dataTokenValid = decodeBack.userId === decode.id && decodeBack.ip === req.ip
//             //console.log(bcrypt.compare(admin.token ))
//         }
//     }
    //  console.log(authHeader)
    //   console.log(authHeader? authHeader: "pas de token fronnt recu")
    //  console.log("adminMiddlewares")

    // console.log("credentiel peut etre pas inclus")
    
     
    // if token if admin => generate custom token : token{user_id, datetime, ip}
    // const token = req.body

    // const decoded = jwt.verify(req.body.token, process.env.SECRET_KEY_JWT)
    // console.log(decoded)
     next()
}
export default adminMiddleware