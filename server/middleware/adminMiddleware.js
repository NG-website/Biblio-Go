import jwt, { decode } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const adminMiddleware = (req, res, next)=>{
    console.log("adminMiddlewares")
    console.log(req?.session?.user?.role)
    console.log(req?.session?.user?.userId)

        fetch("http://localhost:3000/api/user/id", {
      method: "POST",
      credentials:"include",
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res)
        }
        if (res.status === 400) {
          setPasswordMessage("Mot de passe actuel incorrect");
        }
        return res.json()
      })
      .then((data)=>{
        console.log(data)
      })
    // if token if admin => generate custom token : token{user_id, datetime, ip}
    // const token = req.body

    // const decoded = jwt.verify(req.body.token, process.env.SECRET_KEY_JWT)
    // console.log(decoded)
}
export default adminMiddleware