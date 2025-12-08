import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import sendMail from "../utils/nodemailer.js"
import generateTokenRandom, { IncrementeDate } from "../utils/functions.js"
import reqMiddleware from "../utils/ReqMiddelware.js"
const adminController = {

    async CreateUser(req, res) {
        try {
            const schema = {
                name: {
                    type: "string",
                    minLength: 2,
                    maxLength: 40,
                    regex: /^[a-zA-ZÀ-ÿ '-]+$/
                },
                email: {
                    type: "string",
                    minLength: 2,
                    maxLength: 70,
                    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                },
                password: {
                    type: "string",
                    minLength: 8,
                    maxLength: 30,
                    regex: /^[A-Za-z0-9]+$/
                },

                address: {
                    type: "string",
                    minLength: 2,
                    maxLength: 150,
                    regex: /^[a-zA-ZÀ-ÿ0-9 '-]+$/
                },
                postalCode: {
                    type: "string",
                    minLength: 5,
                    maxLength: 5,
                    regex: /^[1-9][0-9]*$/
                },
                country: {
                    type: "string",
                    minLength: 2,
                    maxLength: 70,
                    regex: /^[a-zA-ZÀ-ÿ '-]+$/
                },
                role: {
                    type: "boolean"
                }
            }

            const reqValide = reqMiddleware(req.body, schema)

            if (!req.body.name || !req.body.email || !req.body.password || !req.body.address || !req.body.postalCode || !req.body.country || !reqValide) {
                return res.status(400).json({ error: "Veuillez vérifier le formulaire, certains champs sont incorrects." });
            }
            const token = generateTokenRandom(16)
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const hashToken = await bcrypt.hash(token, 10)

            const data = {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                address: req.body.address,
                postalCode: req.body.postalCode,
                country: req.body.country,
                actif: false,
                actifToken: hashToken,
                expToken: IncrementeDate(new Date()),
                role: req.body.role
            }
            const create = await userModel.create(data)

            if (create.id) {
                const link = `${FRONT_URL}/api/user/comfirm-account?token=${encodeURIComponent(token)}${create.id}`
                await sendMail(data.email, "inscription", [data.name, link])
                res.status(200).json("ok")
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async UpdateUser(req, res) {
        const id = req.body.id
        const data = req.body.data
        console.log(id)
        const schema = {
            name: {
                type: "string",
                minLength: 2,
                maxLength: 40,
                regex: /^[a-zA-ZÀ-ÿ '-]+$/
            },
            email: {
                type: "string",
                minLength: 2,
                maxLength: 70,
                regex: /^[^\s@]+@[^\s@]+.[^\s@]+$/
            },
            address: {
                type: "string",
                minLength: 2,
                maxLength: 150,
                regex: /^[a-zA-ZÀ-ÿ0-9 '-]+$/
            },
            postalCode: {
                type: "string",
                minLength: 5,
                maxLength: 5,
                regex: /^[1-9][0-9]{4}$/
            },
            country: {
                type: "string",
                minLength: 2,
                maxLength: 70,
                regex: /^[a-zA-ZÀ-ÿ '-]+$/
            },
            id: {
                type: "string",
                minLength: 1,
                maxLength: 5,
                regex: /^[1-9][0-9]*$/
            },
            phone: {
                type: "string",
                minLength: 0,
                maxLength: 10,
            },
            abonnement: {
                type: "string",
                minLength: 0,
                maxLength: 24,
            },
            abonnementType: {
                type: "string",
                minLength: 0,
                maxLength: 10,
            },

            actif: {
                type: "boolean",

            }
        };
        console.log(typeof req.body.data.actif)
        const reqValide = reqMiddleware({ ...req.body.data, id: req.body.id.toString() }, schema);

        if (!data.name || !data.email || !data.address || !data.postalCode || !data.country || !reqValide) {
            return res.status(400).json({ error: "Veuillez vérifier le formulaire, certains champs sont incorrects." });
        }

        try {
            const update = await userModel.update(
                { ...data },
                { where: { id: id } }
            );
            console.log(update)
            res.status(200).json(update)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
export default adminController