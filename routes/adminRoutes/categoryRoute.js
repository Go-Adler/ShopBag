const express = require("express")

const subcategoryRoute = require("./category/subcategoryRoute")
const {
  renderCategoryControlPage
} = require("../../controller/adminController")
const {
  renderCategoryAdd,
  categoryAdd,
  categoryDisable,
  categoryEnable,
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
route.post("/disable", categoryDisable)
route.post("/enable", categoryEnable)

module.exports = route
