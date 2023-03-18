const express = require("express")

const subcategoryRoute = require("../adminRoutes/category/subCategory")
const {
  renderCategoryControlPage
} = require("../../controller/adminController")
const {
  renderCategoryAdd,
  categoryAdd,
  subcategoryAdd,
  categoryDisable,
  subcategoryDisable,
  categoryEnable,
  subcategoryEnable,
  renderCategoryEdit,
  categoryEdit
} = require("../../controller/adminControllers/categoryController")

const route = express.Router()

route.use("/subcategory", subcategoryRoute)

route.get("/", renderCategoryControlPage)
route.get("/add", renderCategoryAdd)
route.get("/edit/:id", renderCategoryEdit)

route.post("/edit/:id", categoryEdit)
route.post("/add", categoryAdd)
route.post("/subAdd", subcategoryAdd)
route.post("/disable", categoryDisable)
route.post("/subdisable", subcategoryDisable)
route.post("/enable", categoryEnable)
route.post("/subenable", subcategoryEnable)

module.exports = route
