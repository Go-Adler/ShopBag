const express = require('express')

const productsController = require("../../controller/adminControllers/productsController")

const route = express.Router()

route.get("/add", productsController.productsAddLoad);
route.get("/edit", productsController.productsEditLoad);
route.get("/", productsController.productsLoad);

route.post("/add", productsController.productAdd);

module.exports = route