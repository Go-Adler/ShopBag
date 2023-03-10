const express = require('express')
const { upload, sharpedImage } = require("../../middlewares/adminMiddlewares")

const { productEdit, renderProductEditPage, renderProductsPage, renderProductAddPage, productAdd, disableProduct, enableProduct } = require("../../controller/adminControllers/productsController")

const route = express.Router()

route.get("/add", renderProductAddPage);
route.get("/edit/:id", renderProductEditPage);
route.get("/", renderProductsPage);

route.post("/edit/:id",  upload, productEdit);
route.post("/add", upload, sharpedImage, productAdd);
route.post("/disable",  disableProduct);
route.post("/enable",  enableProduct);
route.post("/enable",  enableProduct);


module.exports = route