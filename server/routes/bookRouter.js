import {Router} from 'express' 
import bookController from '../controllers/bookController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const bookRouter = Router()
console.log("router")
bookRouter.get('/all', bookController.All)
bookRouter.get('/Les%20Meilleurs', bookController.New)
bookRouter.get('/Les%20Nouveautés', bookController.Best)
bookRouter.get('/Les%20Tendances', bookController.Mode)
bookRouter.get('/categories', bookController.Categories)
bookRouter.post('/autocompleted', bookController.Auto)
bookRouter.post('/id', bookController.Id)
bookRouter.post('/create', bookController.Create)
bookRouter.put('/update', bookController.Update)
bookRouter.delete('/delete', bookController.Delete)
bookRouter.post('/author', bookController.Author)
export default bookRouter