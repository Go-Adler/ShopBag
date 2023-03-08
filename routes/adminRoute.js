const express = require("express")

const userRoute = require("./adminRoutes/usersRoute")
const categoryRoute = require("./adminRoutes/categoryRoute")
const productsRoute = require("./adminRoutes/productsRoute")

const { adminSession } = require("../services/AdminServices/session")
const { signInValidate } = require("../controller/adminAccessController")
const {
  renderSignInPage,
  renderHomePage,
  renderUserProfilePage,
} = require("../controller/adminController")
const {
  validateSignOut,
  validateSignIn,
  destroySession
} = require("../middlewares/commonMiddlewares")

const route = express.Router()

route.use(adminSession)

route.use("/users", validateSignOut, userRoute)
route.use("/category", validateSignOut, categoryRoute)
route.use("/products", validateSignOut, productsRoute)

route.get("/signin", validateSignIn, renderSignInPage)
route.get("/home", validateSignOut, renderHomePage)
route.get("/profile", validateSignOut, renderUserProfilePage)
route.get("/logout", destroySession)

route.post("/signin", validateSignIn, signInValidate)

module.exports = route
