const express = require("express")
const { renderOrdersPage } = require("../../controller/userController/orderController")

const router = express.Router()

router.get("/", renderOrdersPage)

module.exports = router