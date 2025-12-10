import authorModel from "../models/authorModel.js"
import reqMiddleware from "../utils/ReqMiddelware.js"

const authorController = {
    async All(req, res) {
        const response = await authorModel.findAll()
        res.json(response)
    },
    
    async Id(req, res) {
        const id = req.body.id
        // const schema = {
        //     id: {
        //         type: "number",
        //         regex: /^[1-9][0-9]*$/
        //     }
        // };

        // const reqValide = reqMiddleware({ id }, schema)

        // if (!id || !reqValide) {
        //     return res.status(400).json({ error: "Veuillez vérifier le formulaire, certains champs sont incorrects." });
        // }
        const response = await authorModel.findOne({ where: { id: id } })
        res.json(response)
    },

    async Create(req, res) {
        try {
            const data = req.body.data

            // const schema = {
            //     firstname: {
            //         type: "string",
            //         minLength: 2,
            //         maxLength: 40,
            //         regex: /^[a-zA-ZÀ-ÿ '-]+$/
            //     },
            //     lastname: {
            //         type: "string",
            //         minLength: 2,
            //         maxLength: 40,
            //         regex: /^[a-zA-ZÀ-ÿ '-]+$/
            //     },
            //     description: {
            //         type: "string",
            //         minLength: 2,
            //         maxLength: 1000
            //     }
            // };

            // const reqValide = reqMiddleware(data, schema)

            // if (!data || !reqValide) {
            //     return res.status(400).json({ error: "Veuillez vérifier le formulaire, certains champs sont incorrects." });
            // }

            const exist = await authorModel.findOne({
                where: {
                    firstname: data.firstname,
                    lastname: data.lastname
                }
            })

            if (exist === null) {
                const response = await authorModel.create({ ...req.body.data });
                return res.status(201).json(response.firstname + " " + response.lastname + " enregistré");
            } else {
                return res.status(409).json({ error: "Cet auteur existe déjà" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Erreur serveur" });
        }
    },

    async Update(req, res) {
        try {
            const data = req.body.data
            const id = req.body.id

            const schema = {
                firstname: {
                    type: "string",
                    minLength: 2,
                    maxLength: 40,
                    regex: /^[a-zA-ZÀ-ÿ '-]+$/
                },
                lastname: {
                    type: "string",
                    minLength: 2,
                    maxLength: 40,
                    regex: /^[a-zA-ZÀ-ÿ '-]+$/
                },
                description: {
                    type: "string",
                    minLength: 2,
                    maxLength: 1000
                },
                id: {
                    type: "number",
                    regex: /^[1-9][0-9]*$/
                }
            };

            const reqValide = reqMiddleware(data, schema)

            if (!data || !id || !reqValide) {
                return res.status(400).json({ error: "Veuillez vérifier le formulaire, certains champs sont incorrects." });
            }

            const response = await authorModel.update(
                { ...data },
                { where: { id: id } }
            )
            res.json(response)
        } catch (error) {
            return res.status(500).json({ error: "Erreur serveur" });
        }
    },

    async Delete(req, res) {
        try {
            const id = req.body.id

            const schema = {
                id: {
                    type: "number",
                    regex: /^[1-9][0-9]*$/
                }
            };

            const reqValide = reqMiddleware({ id }, schema)

            if (!id || !reqValide) {
                return res.status(400).json({ error: "Veuillez vérifier le formulaire, certains champs sont incorrects." });
            }
            const response = await authorModel.destroy(
                { where: { id: id } }
            )
            res.json(response)
        } catch (error) {
            return res.status(500).json({ error: "Erreur serveur" });
        }
    },
}
export default authorController