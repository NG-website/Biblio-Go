import {Router} from 'express' 
import apiController from '../controllers/apiController.js'


const apiRouter = Router()

apiRouter.post('/user', apiController.verifUser)
export default apiRouter