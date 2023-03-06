const express = require('express')

const { renderUsersListPage } = require('../../controller/adminController')
const { block, unblock} = require('../../controller/adminControllers/userController')

const route = express.Router()

route.post("/block", block)
route.post("/unblock", unblock);
route.get("/", renderUsersListPage);

module.exports = route