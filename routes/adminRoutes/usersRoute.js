const express = require('express')

const { renderUsersListPage } = require('../../controller/adminController')
const userController = require('../../controller/adminControllers/userController')

const route = express.Router()

route.post("/block", userController.block)
route.post("/unblock", userController.unblock);
route.get("/", renderUsersListPage);

module.exports = route