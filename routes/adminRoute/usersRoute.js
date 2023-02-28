const express = require('express')

const userController = require('../../controller/adminControllers/userController')

const route = express.Router()

route.get("/users", userController.block);
route.get("/users", userController.unBlock);

module.exports = route