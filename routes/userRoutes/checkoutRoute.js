const express = require("express")
const { renderCheckoutPage, renderPlaceOrderPage } = require("../../controller/userController/checkoutController")

const router = express.Router()

router.get("/", renderCheckoutPage)

router.post("/", renderPlaceOrderPage)

module.exports = router