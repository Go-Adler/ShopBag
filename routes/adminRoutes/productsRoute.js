const express = require('express')

const { renderProductsPage, renderProductAddPage, productAdd } = require("../../controller/adminControllers/productsController")

const route = express.Router()

route.get("/add", renderProductAddPage);
// route.get("/edit", productsController.productsEditLoad);
route.get("/", renderProductsPage);

route.post("/add", productAdd);

module.exports = route