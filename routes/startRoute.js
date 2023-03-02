const express = require("express")

const signInController = require("../controller/userAccessController")

const route = express.Router()

route.get("/", signInController.start);

module.exports = route