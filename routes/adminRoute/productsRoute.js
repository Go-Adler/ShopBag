const express = require('express')

const categoryController = require("../../controller/adminControllers/categoryController")
const productsController = require("../../controller/adminControllers/productsController")
const adminController = require("../../controller/adminController")

const route = express.Router()

route.get("/edit", productsController.productsEditLoad);
route.get("/", adminController.productsLoad);

route.post("/subAdd", categoryController.subCategoryAdd);
route.post("/add", categoryController.categoryAdd);
route.post("/disable", categoryController.disableCategory);
route.post("/subdisable", categoryController.disableSubCategory);
route.post("/enable", categoryController.enableCategory);
route.post("/subenable", categoryController.enableSubCategory);

module.exports = route