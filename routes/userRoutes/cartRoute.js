const express = require("express")
const { renderCartPage, decrementQuantity, incrementQuantity } = require("../../controller/userController/cartController")

const router = express.Router()

router.get("/", renderCartPage)

router.post("/increment-quantity", incrementQuantity)
router.post("/decrement-quantity", decrementQuantity)

module.exports = router