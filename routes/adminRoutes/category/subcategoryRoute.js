const express = require("express")

const {
  renderSubcategoryEdit,
  subcategoryEdit,
  subcategoryEnable,
  subcategoryDisable,
  renderSubcategoryAdd,
} = require("../../../controller/adminControllers/subcategoryController")

const route = express.Router()

route.get("/add", renderSubcategoryAdd)
route.get("/edit/:id", renderSubcategoryEdit)

route.post("/add", subcategoryAdd)
route.post("/edit/:id", subcategoryEdit)
route.post("/enable", subcategoryEnable)
route.post("/disable", subcategoryDisable)

module.exports = route
