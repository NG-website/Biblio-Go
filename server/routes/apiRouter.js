import {Router} from 'express' 
import apiController from '../controllers/apiController'


const apiRouter = Router()

apiRouter.post('/user', apiController.verifUser)
export default apiRouter