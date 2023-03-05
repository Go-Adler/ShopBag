const express = require("express")
const renderProductPage = require("../../controller/userController/productController")

const router = express.Router()

router.get("/:id", renderProductPage)

module.exports = router