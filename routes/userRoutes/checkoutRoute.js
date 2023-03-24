import express from 'express'

import { renderCheckoutPage, renderPlaceOrderPage } from '../../controller/userController/checkoutController.js'

export const router = express.Router()

router.get("/", renderCheckoutPage)

router.post("/", renderPlaceOrderPage)