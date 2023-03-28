import express from 'express'

import { renderCheckoutPage, renderPlaceOrderPage, applyCoupon } from '../../controller/userController/checkoutController.js'

export const router = express.Router()

router.get("/", renderCheckoutPage)

router.post('/applyCoupon', applyCoupon)
router.post("/", renderPlaceOrderPage)