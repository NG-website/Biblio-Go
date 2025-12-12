import authorModel from "../models/authorModel.js"
import bookModel from "../models/bookModel.js"
import bookUserModel from "../models/bookUserModel.js"
import userModel from "../models/userModel.js"
import sendMail from "../utils/nodemailer.js"
import '../models/Model.js'

const bookUserController = {
    async All(req, res) {
        try {
            const all = await bookUserModel.findAll({
                include: [
                    {
                        model: bookModel,
                        include: [authorModel],

                    }, { model: userModel }]

            })
            //controller la data renvoyer : Attention mot de passe
            res.status(200).json(all)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Id(req, res) {
        try {
            const admin = req?.session?.user?.role === true
            const userId = req.session?.user?.userId
            if (admin) {
                
                const books = await bookUserModel.findAll({
                    where: { userId : userId },
                    include: [{ model: bookModel, include: [authorModel] }]
                });
                 res.status(200).json(books);
            } else {
                const data = req.body.data;
                const userId = req?.session?.user?.userId
                const books = await bookUserModel.findAll({
                    where: { ...data, userId },
                    include: [{ model: bookModel, include: [authorModel] }]
                });
                 res.status(200).json(books);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async Dispo(req, res) {
        try {
            const { bookId } = req.body;

            const books = await bookUserModel.findAll({
                where: { bookId },

            });

            res.status(200).json(books);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    ,
    async Create(req, res) {

        try {
            const admin = req?.session?.user?.role
            const { take_at, deposit_at, bookId, bookName } = req.body

            if (admin === true) {
                const userId = req.body.userId
                //sortir le useremail
                const userEmail = req.body.userEmail

                const exist = await bookUserModel.findOne({ where: { userId: userId, bookId: bookId } })
                if (!exist || exist == null) {
                    const create = await bookUserModel.create({ take_at: take_at, deposit_at: deposit_at, userId: userId, bookId: bookId, take: false, deposit: false })
                    console.log(create)
                    sendMail(userEmail, "reservation", [bookName, take_at, deposit_at])
                    return res.status(201).json(create)
                }
                else {

                    return res.status(401).json({ error: "vous avez déjà reservé ce livre et vous ne l'avez' pas encore rendu" })
                }
            }
            if (admin != true) {
                const userId = req?.session?.user?.userId
                //sortir le useremail
                // const userName = req?.session?.user?.userName
                const userEmail = req?.session?.user?.userEmail
                const { take_at, deposit_at, bookId, bookName } = req.body
                const exist = await bookUserModel.findOne({ where: { userId: userId, bookId: bookId } })
                if (!exist || exist == null) {
                    const create = await bookUserModel.create({ take_at: take_at, deposit_at: deposit_at, userId: userId, bookId: bookId, take: false, deposit: false })
                    sendMail(userEmail, "reservation", [bookName, take_at, deposit_at])
                    return res.status(201).json(create)
                }
                else {
                    if (exist?.deposit) {
                        const update = await bookUserModel.update(
                            { take_at: take_at, deposit_at: deposit_at, createdAt: new Date(), updatedAt: new Date(), take: false, deposit: false },
                            { where: { userId: userId, bookId: bookId } })
                        sendMail(userEmail, "reservation", [bookName, take_at, deposit_at])
                        res.status(201).json(create)
                    }
                    else {
                        return res.status(401).json({ error: "vous avez déjà reservé ce livre et vous ne l'avez' pas encore rendu" })
                    }
                }
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async Update(req, res) {
        try {
            const data = req.body.data
            console.log(data)
            const admin = req?.session?.user?.role === true
            if (admin) {
                const borrowId = req.body.id
                const update = await bookUserModel.update(
                    { ...data },
                    { where: { ...borrowId } }
                )
                res.status(200).json(update)
            } else {
                const id = req.body.id
                console.log(id)
                const userId = req?.session?.user?.userId
                console.log(userId)
                const update = await bookUserModel.update(
                    { ...data },
                    { where: { ...id, userId } }
                )
                res.status(200).json(update)
            }

        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async Delete(req, res) {
        try {
            const admin = req?.session?.user?.role === true
            if (admin) {
                const id = req.body.id
                const destroy = await bookUserModel.destroy({ where: { id: id } })
                res.json(destroy)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}
export default bookUserController