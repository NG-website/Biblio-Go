import Router from 'express'
import authorController from '../controllers/authorController.js'

const authorRouter = Router()
authorRouter.get("/all", authorController.All )
authorRouter.post("/id", authorController.Id )
authorRouter.put("/update", authorController.Update)
authorRouter.post("/create", authorController.Create )
authorRouter.delete("/delete", authorController.Delete )
export default authorRouter