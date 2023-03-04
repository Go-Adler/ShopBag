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
  validateSessionSignOut,
  validateSessionSignIn,
  destroySession,
} = require("../middlewares/commonMiddlewares")

const route = express.Router()

route.use(adminSession)

route.use("/users", userRoute)
route.use("/category", categoryRoute)
route.use("/products", validateSessionSignOut, productsRoute)

route.get("/signin", validateSessionSignIn, renderSignInPage)
route.get("/home", validateSessionSignOut, renderHomePage)
route.get("/profile", validateSessionSignOut, renderUserProfilePage)
route.get("/logout", destroySession, renderSignInPage)

route.post("/signin", validateSessionSignIn, signInValidate)

module.exports = route
