const express = require("express");
const adminAccessController = require("../controller/adminAccessController");
const adminController = require("../controller/adminController");

const route = express.Router();

route.get("/signin", adminAccessController.signInLoad);
route.get("/users", adminController.userLoad);
route.get("/home", adminController.homeLoad)

route.post("/signin", adminAccessController.signInValidate);

module.exports = route;
