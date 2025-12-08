import { Op } from "sequelize"
import sequelize from "../config/db_config.js"
import bookModel from "../models/bookModel.js"
import authorModel from "../models/authorModel.js"
import categoriesModel from "../models/categoriesModel.js"
import bookUserModel from "../models/bookUserModel.js"
const bookController = {
    async All(req, res) {
        try {
            const all = await bookModel.findAll({
                include: [
                    categoriesModel,
                    authorModel
                ]
            })
            res.status(200).json(all)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async New(req, res) {
        try {
            const all = await bookModel.findAll({
                order: [
                    [sequelize.literal("ABS(TIMESTAMPDIFF(SECOND, `createdAt`, NOW()))"), "DESC"]
                ],
                limit: 30
            });
            res.status(200).json(all)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Best(req, res) {
        try {
            const all = await bookModel.findAll({
                order: [
                    [`note`, "DESC"]
                ],
                limit: 30
            });
            res.status(200).json(all)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
        async Mode(req, res) {
        try {
            const all = await bookModel.findAll({
                order: [
                    [`borrow`, "DESC"]
                ],
                limit: 30
            });
            res.status(200).json(all)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Categories(req, res) {
        try {
            const all = await categoriesModel.findAll({})
            console.log(all)
            res.status(200).json(all)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Auto(req, res) {
        try {
            const books = await bookModel.findAll({
                where: sequelize.where(
                    sequelize.col('name'),
                    'LIKE',
                    `${req.body.data}%`
                )
            });
            const authors = await authorModel.findAll({
                where: sequelize.where(
                    sequelize.col('firstname' || 'lastname'),
                    'LIKE',
                    `${req.body.data}%`
                )
            });
            const results = [books, authors];
            res.status(200).json(results)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Id(req, res) {
        try {
            const bookId =  req.body.id
            const book = await bookModel.findOne({ where: {id : bookId}, include: authorModel })
            res.status(200).json(book)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Create(req, res) {
     //   console.log(req.body)
        try {

            const { name, authorId, stock, categoryId, note, description } = req.body
            
            const create = await bookModel.create({ name: name, authorId: authorId, stock: stock, categoryId: categoryId, note: note, description:description })
            res.status(201).json(create)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Update(req, res) {
     //   console.log(req.body)
        try {
            //update le 10/11
            // const takeAt = req.body.takeAt
            // const depositAt = req.body.depositAt
            // const id = req.body.id
            const update = await bookModel.update(
                {...req.body.data},
                {where : {... req.body.id}}
                // { takeAt: takeAt, depositAt: depositAt },
                // { where: { id: id } }
            )
            res.status(200).json(update)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Delete(req, res) {
        try {
         //   console.log(typeof req.body.id)
            const { id } = req.body
            const destroy = await bookModel.destroy({ where:{id:req.body.id} })
            res.json(destroy)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Author(req, res) {
        try {
            const id = req.body.id
            const authorBook = await bookModel.findAll({ where: { authorId: id } })
            res.json(authorBook)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}
export default bookController