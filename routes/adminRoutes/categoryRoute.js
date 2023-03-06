const express = require('express')

const { renderCategoryControlPage } = require('../../controller/adminController')
const { categoryAdd, subcategoryAdd, categoryDisable, subcategoryDisable, categoryEnable, subcategoryEnable } = require('../../controller/adminControllers/categoryController')

const route = express.Router()

route.get("/", renderCategoryControlPage);

route.post("/add", categoryAdd);
route.post("/subAdd", subcategoryAdd);
route.post("/disable", categoryDisable);
route.post("/subdisable", subcategoryDisable);
route.post("/enable", categoryEnable);
route.post("/subenable", subcategoryEnable);

module.exports = route