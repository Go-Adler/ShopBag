const express = require("express");
const adminAccessController = require("../controller/adminAccessController");
const adminController = require("../controller/adminController");
const userRoute = require("../routes/adminRoute/usersRoute")

const route = express.Router();

route.get("/signin", adminAccessController.signInLoad);
route.get("/users", userRoute)
route.get("/home", adminController.homeLoad)
route.get("/profile", adminController.profile)
route.get("/logout", adminAccessController.logout)

route.post("/signin", adminAccessController.signInValidate);

module.exports = route;
