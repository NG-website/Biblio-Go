import Router from 'express'
import adminController from '../controllers/adminController.js'
const adminRouter = Router()
import  dotenv  from 'dotenv'
import stripe from 'stripe'
dotenv.config()

adminRouter.post('/dashboard', adminController.Dashboard)
// adminRouter.post('/bookuser/update', adminController.Update)
adminRouter.post("/create-coupon", async (req, res) => {
  const stripe_ = new stripe(process.env.SECRET_KEY_STRIPE)

  try {
    const { name, percent_off, duration, duration_in_months} = req.body;
    console.log(req.body)
    const coupon = await stripe_.coupons.create({
      name,
      percent_off,
      duration,
      duration_in_months: duration === "repeating" ? duration_in_months : undefined,
    });

    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default adminRouter