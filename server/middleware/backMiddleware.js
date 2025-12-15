import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const backMiddleware = async (req, res, next) => {
    
    const token = req.headers.authorization
    const decode = jwt.decode(token)
    const expired = decode.token < new Date()
    if(!expired){
        res.status(403).json("token expiré")
    }
   
    if (req.headers.origin === "https://biblio-go.vercel.app/") {
        next()
    } else {
        if (token && decode) {

            fetch(`${process.env.API_URL}api/auth/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: decode.userId })
            })
                .then((res) => { return res.json() })
                .then((data) => {
                    if(data){
                         const isValide = bcrypt.compare("", data.token)
                    if (isValide) {
                        next()
                    }else{
                    res.status(403).json("token non valid")
                    }
                }
                })
        }
        res.status(500).json("url unautorized")
    }

}
export default backMiddleware