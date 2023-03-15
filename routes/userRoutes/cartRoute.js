const express = require("express")
const { renderCartPage, addQuantity } = require("../../controller/userController/cartController")

const router = express.Router()

router.get("/", renderCartPage)

router.post("/update", addQuantity)

module.exports = router