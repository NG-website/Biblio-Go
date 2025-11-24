import Router from 'express'
import authorController from '../controllers/authorController.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const authorRouter = Router()
authorRouter.get("/all", authorController.All )
authorRouter.post("/id", authorController.Id )
authorRouter.put("/update",adminMiddleware, authorController.Update)
authorRouter.post("/create",adminMiddleware, authorController.Create )
authorRouter.delete("/delete",adminMiddleware, authorController.Delete )
export default authorRouter