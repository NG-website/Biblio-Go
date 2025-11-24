import {Router} from 'express' 
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const userRouter = Router()

userRouter.get('/all', userController.All)
userRouter.post('/id', userController.Id)
userRouter.post('/create', userController.Create)
userRouter.put('/update', userController.Update)
userRouter.post('/search', userController.Search)
userRouter.get('/comfirm-account', userController.ComfirmAccount)
userRouter.put('/update-password', userController.UpdatePassword)
userRouter.post('/forgot-password', userController.CreateNewPassword)
userRouter.delete('/delete', userController.Delete)
export default userRouter