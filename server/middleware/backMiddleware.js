import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const backMiddleware = (req, res, next) => {

    if (req.headers.origin == "https://biblio-go.vercel.app") {
        console.log("front url ok")
        next()
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1]
            console.log(token)

            const decode = jwt.decode(token)
            console.log(decode)

            const expired = decode.exp * 1000 < Date.now()
            console.log(new Date(decode.exp * 1000))
            console.log(expired)
            if (expired) {
                return res.status(403).json("token expiré")
            }

            if (token) {
                console.log("devrait pas etre la")
                fetch(`https://biblio-go.onrender.com/api/auth/user`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: decode.userId })
                })
                .then(response => response.json())
                .then(data => {
                    if (!data) {
                        return res.status(404).json("Utilisateur non trouvé")
                    }
                    console.log(data)

                    try {
                        const isValide = jwt.verify(token, process.env.SECRET_KEY_JWT)
                        console.log(isValide)
                        if (isValide) {
                            console.log("passe")
                            return next()
                        } else {
                            return res.status(403).json("token non valid")
                        }
                    } catch (err) {
                        return res.status(403).json("token non valid")
                    }
                })
                .catch(err => {
                    console.error(err)
                    return res.status(500).json("Erreur serveur fetch")
                })
            } else {
                return res.status(401).json("Token manquant")
            }

        } catch (err) {
            console.error(err)
            return res.status(500).json("Erreur serveur")
        }
    }

}

export default backMiddleware
