import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const backMiddleware = async (req, res, next) => {



    if (req.headers.origin == "https://biblio-go.vercel.app") {
        console.log("front url ok")
        next()
    } else {
        const token = req.headers.authorization?.split(' ')[1]
        console.log(req.headers.origin)
        const decode = jwt.decode(token)
        const expired = decode.exp * 1000 < new Date()
        if (!expired) {
            res.status(403).json("token expiré")
        }
        if (token && decode) {
            console.log("devrait pas etre la")
            fetch(`${process.env.API_URL}api/auth/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: decode.userId })
            })
                .then((res) => { return res.json() })
                .then((data) => {
                    if (data) {
                        const isValide = await bcrypt.compare("", data.token)
                        if (isValide) {
                            next()
                        } else {
                            res.status(403).json("token non valid")
                        }
                    }
                })
        }
        res.status(500).json("url unautorized")
    }

}
export default backMiddleware