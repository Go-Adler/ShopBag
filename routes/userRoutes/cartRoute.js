const express = require("express")
const { renderCartPage } = require("../../controller/userController/cartController")

const router = express.Router()

router.get("/", renderCartPage)

module.exports = router