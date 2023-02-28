const express = require('express')

const adminController = require('../../controller/adminController')
const userController = require('../../controller/adminControllers/userController')

const route = express.Router()

route.post("/block", userController.block)
route.post("/unblock", userController.unBlock);
route.get("/", adminController.userLoad);

module.exports = route