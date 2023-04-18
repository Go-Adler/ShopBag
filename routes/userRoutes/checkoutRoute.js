import express from 'express'

import { renderCheckoutPage, renderPlaceOrderPage, applyCoupon, razorpayController } from '../../controller/userController/checkoutController.js'

export const router = express.Router()

router.get("/", renderCheckoutPage)

router.post('/razorpayOnlineSuccess', renderPlaceOrderPage)
router.post('/razorpayOnline', razorpayController)
router.post('/applyCoupon', applyCoupon)
router.post("/", renderPlaceOrderPage)