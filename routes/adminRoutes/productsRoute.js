const express = require('express')
const upload = require("../../middlewares/adminMiddlewares")

const { renderProductsPage, renderProductAddPage, productAdd } = require("../../controller/adminControllers/productsController")

const route = express.Router()

route.get("/add", renderProductAddPage);
// route.get("/edit", productsController.productsEditLoad);

route.get("/", renderProductsPage);

route.post("/add", upload,  productAdd);


module.exports = route