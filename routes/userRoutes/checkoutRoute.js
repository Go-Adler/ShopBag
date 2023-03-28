import express from 'express'

import { renderCheckoutPage, renderPlaceOrderPage, applyCoupon, rendorRazorpay, razorpayController } from '../../controller/userController/checkoutController.js'

export const router = express.Router()

router.get('/razorpayOnline', renderPlaceOrderPage)
router.get("/", renderCheckoutPage)

router.post('/razorpayOnline', razorpayController)
router.post('/razorpay', rendorRazorpay)
router.post('/applyCoupon', applyCoupon)
router.post("/", renderPlaceOrderPage)