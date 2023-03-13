const express = require("express")
const { renderCheckoutPage } = require("../../controller/userController/checkoutController")

const router = express.Router()

router.get("/", renderCheckoutPage)

module.exports = router