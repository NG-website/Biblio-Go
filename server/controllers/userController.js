import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import sendMail from "../utils/nodemailer.js"
import generateTokenRandom, { IncrementeDate } from "../utils/functions.js"
import { Op, where } from "sequelize"
import adminMiddleware from "../middleware/adminMiddleware.js"
import reqMiddleware from "../utils/ReqMiddelware.js"

const userController = {
    async All(req, res) {
        try {
            const all = await userModel.findAll({})
            res.status(200).json(all)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Contact(req, res) {
        try {
            const data = req.body
            const contentEmail = ([
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                req.body.contentEmail
            ])

            const schema = {
                contentEmail: {
                    type: "string",
                    minLength: 2,
                    maxLength: 500,
                    regex: /^(?!.*<[^>]*>)(?!.*<\/?script\b)[\p{L}\p{N}\s\.,'"\-:;()?!]{1,500}$/u
                },
                email: {
                    type: "string",
                    minLength: 2,
                    maxLength: 40,
                    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                },
                firstname: {
                    type: "string",
                    minLength: 2,
                    maxLength: 40,
                    regex: /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u
                },
                lastname: {
                    type: "string",
                    minLength: 2,
                    maxLength: 40,
                    regex: /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u
                }

            }
            const reqValide = reqMiddleware(data, schema)

            if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.contentEmail || !reqValide) {
                return res.status(400).json("Veuillez vérifier le formulaire, certains champs sont incorrects.");
            }
            const send = await sendMail("bibliogo@outlook.fr", "contact", contentEmail)

            if (!send) {
                res.status(500).json("Email non envoyé")
            }

            res.status(200).json(true)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Id(req, res) {
        try {
            const { id } = req.body
            const user = await userModel.findOne({ where: { id: id } });
            const userInfo = {
                name: user.name,
                email: user.email,
                address: user.address,
                postalCode: user.postalCode,
                country: user.country,
                phone: user.phone,
                //abonement: user.abonement,
                // abonementType: user.abonementType
            }
            res.status(200).json(userInfo)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Create(req, res) {
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
            };

            const reqValide = reqMiddleware(req.body, schema)

            // if (!req.body.name || !req.body.email || !req.body.password || !req.body.address || !req.body.postalCode || !req.body.country || !reqValide) {
            //     return res.status(400).json("Veuillez vérifier le formulaire, certains champs sont incorrects.");
            // }

            const exist = await userModel.findOne({ where: { email: req.body.email } });
            if (exist) {
                return res.status(409).json({ error: "Cet email est déjà utilisé." });
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
                role: false
            }

            const create = await userModel.create(data)

            if (create.id) {
                const link = `http://localhost:3000/user/comfirm-account?token=${encodeURIComponent(token)}${create.id}`
                await sendMail(data.email, "inscription", [data.name, link])
                res.status(201).json("ok")
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async ComfirmAccount(req, res) {
        try {
            const query = req.query.token
            const token = query.slice(0, 16)
            const id = query.slice(16)
            const data = { id: id, token: token }

            const schema = {
                id: {
                    type: "string",
                    regex: /^[1-9][0-9]*$/
                },
                token: {
                    type: "string",
                    minLength: 16,
                    maxLength: 16
                }
            }

            const reqValide = reqMiddleware(data, schema)

            if (!id || !reqValide) {
                return res.status(400).json("Veuillez vérifier le formulaire, certains champs sont incorrects.");
            }

            const user = await userModel.findOne({ where: { id: id } })

            if (!user) {
                res.json("user inexistant")
            }

            const tokenValid = await bcrypt.compare(token, user.actifToken)
            const tokenExp = user.expToken > new Date()

            if (tokenValid && tokenExp) {
                const activeAccount = await userModel.update(
                    { actif: true, actifToken: null, expToken: null },
                    { where: { id: id } }
                )
                if (activeAccount[0] === 1) {
                    res.redirect('http://localhost:5173/login')
                } else {
                    res.json('ereur base de données update user')
                }
            } else {
                res.json("token faux ou expirée")
            }

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async Update(req, res) {

        const data = req.body.data
        const id = req.body.id

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
            id: {
                type: "string",
                minLength: 1,
                maxLength: 5,
                regex: /^[1-9][0-9]*$/
            },
            phone: {
                type: "string",
                minLength: 10,
                maxLength: 10,
            }

        };

        const reqValide = reqMiddleware({ ...req.body.data, id: req.body.id.toString() }, schema)

        if (!req.body.data.name || !req.body.data.email || !req.body.data.address || !req.body.data.postalCode || !req.body.data.country || !reqValide) {
            return res.status(400).json("Veuillez vérifier le formulaire, certains champs sont incorrects.");
        }

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
            console.log(id)

            const schema = {
                currentPassword:{
                    type: "string",
                    minLength: 8,
                    maxLength: 30,
                    regex: /^[A-Za-z0-9]+$/
                },
                confirmPassword:{
                    type: "string",
                    minLength: 7,
                    maxLength: 30,
                    regex: /^[A-Za-z0-9]+$/
                },
                newPassword: {
                    type: "string",
                    minLength: 7,
                    maxLength: 30,
                    regex: /^[A-Za-z0-9]+$/
                }
            };


            const reqValide = reqMiddleware(req.body.data, schema)
 
            console.log("reqValide?", reqValide)

            // if (!data.newPassword || !data.currentPassword || !data.confirmPassword || !reqValide) {
            //     return res.status(400).json({ error: "Veuillez vérifier le formulaire, certains champs sont incorrects." });
            // }

            const confirmPassword = data.newPassword === data.confirmPassword
            //   console.log("3", confirmPassword)
            if (confirmPassword) {
                const user = await userModel.findOne({ where: { id: id } });
                ///    console.log(user)
                const passwordValid = await bcrypt.compare(data.currentPassword, user.password)
                //   console.log(passwordValid)
                if (!passwordValid) {
                    //    console.log(5)
                    return res.status(400).json("mot de passe actuel invalide");
                }
                if (passwordValid) {
                    //   console.log(6)
                    const newPassword = await bcrypt.hash(data.newPassword, 10)
                    const update = await userModel.update(
                        { password: newPassword },
                        { where: { id: id } }
                    );
                    console.log(update)
                    res.status(200).json(update)
                }
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async CreateNewPassword(req, res) {
        try {
            const { email } = req.body
            const schema = {
                email: {
                    type: "string",
                    minLength: 2,
                    maxLength: 70,
                    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                },
            }
            const reqValide = reqMiddleware(req?.body?.data, schema)

            if (!email || !reqValide) {
                return res.status(400).json("Veuillez vérifier le formulaire, certains champs sont incorrects.");
            }
            const userExist = await userModel.findAll({ where: { email } })
            console.log(userExist[0].id)
            if (userExist.length != 0) {
                //sendMail with custom token 
                const token = generateTokenRandom(16)
                const hashToken = await bcrypt.hash(token, 10)
                const updatePassword = await userModel.update({ password: hashToken }, { where: { id: userExist[0].id } })

                console.log(updatePassword)
                if (updatePassword) {
                    res.status(200).json(`Votre nouveau mot de passe  :${token}`)
                }

            } else {
                res.status(404).json("L’adresse email n'existe pas.")
            }
        } catch (error) {
            return res.status(500).json("Une erreur est survenue. Réessayez plus tard.")
        }
    },
    async Delete(req, res) {
        try {
            const id = req.body.id

            const schema = {
                id: {
                    type: "number",
                }
            };
            const reqValide = reqMiddleware({ id: id }, schema);
            if (!reqValide) {
                return res.status(400).json({ error: "ID invalide pour la suppression." });
            }
            console.log(req.body)
            const destroy = await userModel.destroy({ where: { id: id } })
            res.status(200).json(destroy)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

}
export default userController