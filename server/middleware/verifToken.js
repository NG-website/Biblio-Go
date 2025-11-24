import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifToken = (req, res, next)=>{
    // req.headers["authorization"].split(" ")[1]
    console.log(req.body)
    try {
       const decoded = jwt.verify(req.body.token, process.env.SECRET_KEY_JWT)
       //next()
        res.send(decoded)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}
export default verifToken