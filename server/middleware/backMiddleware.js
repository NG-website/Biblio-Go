import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const backMiddleware = async (req, res, next) => {



    if (req.headers.origin == "https://biblio-go.vercel.app") {
        console.log("front url ok")
        next()
    } else {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decode = await jwt.decode(token)
        console.log(decode)
        const expired = decode.exp * 1000 < new Date()
        console.log(expired)
        if (!expired) {
            return res.status(403).json("token expiré")
        }
        if (token) {
            console.log("devrait pas etre la")
            fetch(`https://biblio-go.onrender.com/api/auth/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: decode.userId })
            })
                .then((res) => { return res.json() })
                .then((data) => {
                    if (data) {
                        const isValide =  bcrypt.compare("", data.token)
                        if (isValide) {
                            console.log("passe")
                            next()
                        } else {
                            return res.status(403).json("token non valid")
                        }
                    }
                })
        }
        res.status(500).json("url unautorized")
    }

}
export default backMiddleware