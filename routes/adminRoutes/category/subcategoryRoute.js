const express = require("express")

const { renderSubcategoryEdit, subcategoryEdit, subcategoryEnable, subcategoryDisable }  = require("../../../controller/adminControllers/subcategoryController")

const route = express.Router()

route.get("/edit/:id", renderSubcategoryEdit)

route.post("/edit/:id", subcategoryEdit)
route.post("/enable", subcategoryEnable)
route.post("/disable", subcategoryDisable)


module.exports = route
