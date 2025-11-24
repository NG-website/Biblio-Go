import {Router} from 'express' 
import bookUserController from '../controllers/bookUserController.js'

const bookUserRouter = Router()
bookUserRouter.get('/all', bookUserController.All)
bookUserRouter.post('/id', bookUserController.Id)
bookUserRouter.post('/dispo', bookUserController.Dispo)
bookUserRouter.post('/create', bookUserController.Create)
bookUserRouter.put('/update', bookUserController.Update)
bookUserRouter.delete('/delete', bookUserController.Delete)
export default bookUserRouter