import { Op } from "sequelize"
import sequelize from "../config/db_config.js"
import bookModel from "../models/bookModel.js"
import authorModel from "../models/authorModel.js"
import categoriesModel from "../models/categoriesModel.js"
import bookUserModel from "../models/bookUserModel.js"
import LikeModel from "../models/LikeModel.js"


const likeController = {

    async All(req, res) {
        try {
            const userId = req?.session?.user?.userId
            const bookLike = await LikeModel.findAll({
                where: {  userId:userId },
                include: [{
                    model: bookModel,
                    include: [authorModel]
                }]
            })
            res.status(200).json(bookLike)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async Id(req, res) {
        try {
            const bookId = req.body.bookId
            const userId = req?.session?.user?.userId
            const book = await LikeModel.findOne({ where: { userId: userId, bookId: bookId } })
            res.status(200).json(book)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async Create(req, res) {
        try {
            const  bookId  = req.body.bookId
            const userId = req?.session?.user?.userId
            const create = await LikeModel.create({ userId: userId, bookId:bookId})
            res.status(201).json(true)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Update(req, res) {
        try {
            const takeAt = req.body.takeAt
            const depositAt = req.body.depositAt
            const id = req.body.id
            const update = await bookModel.update(
                { takeAt: takeAt, depositAt: depositAt },
                { where: { id: id } }
            )
            res.status(200).json(update)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Delete(req, res) {
        try {
            const bookId  = req.body.bookId
            const userId = req?.session?.user?.userId
            const destroy = await LikeModel.destroy({ where: { userId: userId, bookId: bookId } })
            res.json(true)
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
export default likeController