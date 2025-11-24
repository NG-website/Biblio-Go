import {Router} from 'express' 
import likeController from '../controllers/likeController.js'

const likeRouter = Router()
console.log("1")
likeRouter.get('/all', likeController.All)
likeRouter.post('/id', likeController.Id)
likeRouter.post('/create', likeController.Create)
likeRouter.put('/update', likeController.Update)
likeRouter.delete('/delete', likeController.Delete)
export default likeRouter