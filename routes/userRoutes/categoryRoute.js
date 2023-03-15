const express = require("express")
const { renderCategory} = require("../../controller/userController/categoryController")

const router = express.Router()

router.get("/:id", renderCategory)

module.exports = router