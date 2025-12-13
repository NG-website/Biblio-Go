import {Router} from 'express' 
import likeController from '../controllers/likeController.js'

const likeRouter = Router()
likeRouter.post('/all', likeController.All)
likeRouter.post('/id', likeController.Id)
likeRouter.post('/create', likeController.Create)
likeRouter.put('/update', likeController.Update)
likeRouter.delete('/delete', likeController.Delete)
export default likeRouter