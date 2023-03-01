const express = require('express')

const adminController = require('../../controller/adminController')
const categoryController = require('../../controller/adminControllers/categoryController')

const route = express.Router()

route.get("/", adminController.categoryLoad);
route.post("/subAdd", categoryController.subCategoryAdd);
route.post("/add", categoryController.categoryAdd);
route.post("/disable", categoryController.disableCategory);
route.post("/subdisable", categoryController.disableSubCategory);
route.post("/enable", categoryController.enableCategory);
route.post("/subenable", categoryController.enableSubCategory);

module.exports = route