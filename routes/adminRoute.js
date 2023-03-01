const express = require("express");
const adminAccessController = require("../controller/adminAccessController");
const adminController = require("../controller/adminController");
const userRoute = require("../routes/adminRoute/usersRoute")
const categoryRoute = require("../routes/adminRoute/categoryRoute")
const productsRoute = require("../routes/adminRoute/productsRoute")

const route = express.Router();

route.use("/users", userRoute)
route.use("/category", categoryRoute)
route.use("/products", productsRoute)

route.get("/signin", adminAccessController.signInLoad);
route.get("/home", adminController.homeLoad)
route.get("/profile", adminController.profileLoad)
route.get("/logout", adminAccessController.logout)

route.post("/signin", adminAccessController.signInValidate);

module.exports = route;
