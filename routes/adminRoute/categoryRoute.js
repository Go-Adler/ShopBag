const express = require('express')

const adminController = require('../../controller/adminController')
const categoryController = require('../../controller/adminControllers/categoryController')

const route = express.Router()

// route.post("/block", userController.block)
// route.post("/unblock", userController.unBlock);
route.get("/", adminController.categoryLoad);

module.exports = route