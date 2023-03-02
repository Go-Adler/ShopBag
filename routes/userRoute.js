const express = require("express");
const session = require("express-session");

const signInController = require("../controller/userAccessController");
const userController = require("../controller/userController");
const userSessionConfig = require("../services/UserServices/session")

const route = express.Router();
const userSession = session({...userSessionConfig, name: "userSession"})

route.use(userSession)

route.get("/signin", signInController.userSignInLoad);
route.get("/signup", signInController.userSignUpLoad);
route.get("/OTPVerification", signInController.OTPVerificationLoad);
route.get("/OTPVerified", signInController.OTPVerifiedLoad);
route.get("/home", userController.home);
route.get("/logout", userController.logout);
route.get("/profile", userController.profile);
route.get("/products/:any", userController.product);

route.post("/OTPVerification", signInController.OTPVerification);
route.post("/signin", signInController.userSignInValidate);
route.post("/signup", signInController.userSignUpValidate);

module.exports = route;
