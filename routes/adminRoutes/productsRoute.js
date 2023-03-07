const express = require('express')
const upload = require("../../middlewares/adminMiddlewares")

const { productEdit, renderProductEditPage, renderProductsPage, renderProductAddPage, productAdd, disableProduct, enableProduct } = require("../../controller/adminControllers/productsController")

const route = express.Router()

route.get("/add", renderProductAddPage);
route.get("/edit/:id", renderProductEditPage);
route.get("/", renderProductsPage);

route.post("/edit/:id", productEdit);
route.post("/add", upload,  productAdd);
route.post("/disable",  disableProduct);
route.post("/enable",  enableProduct);
route.post("/enable",  enableProduct);


module.exports = route