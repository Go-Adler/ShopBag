const express = require("express")

const {
  renderSubcategoryEdit,
  subcategoryEdit,
  subcategoryEnable,
  subcategoryDisable,
  renderSubcategoryAdd,
  subcategoryAdd
} = require("../../../controller/adminControllers/subcategoryController")

const route = express.Router()

route.get("/add", renderSubcategoryAdd)
route.get("/edit/:id", renderSubcategoryEdit)

route.post("/add", subcategoryAdd)
route.post("/edit", subcategoryEdit)
route.post("/enable", subcategoryEnable)
route.post("/disable", subcategoryDisable)

module.exports = route
