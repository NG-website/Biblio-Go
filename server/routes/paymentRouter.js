import { Router } from "express"
import paymentControler from "../controllers/PaymentController.js"
const paymentRouter = Router()


paymentRouter.post('/search-customer',paymentControler.SearchCustomer)
paymentRouter.post('/create-customer',paymentControler.CreateCustomer)
paymentRouter.post('/search-product',paymentControler.SearchProduct)
paymentRouter.post('/create-checkout-session',paymentControler.CreateSession)
paymentRouter.post('/webhook', paymentControler.CheckPayment)

export default paymentRouter