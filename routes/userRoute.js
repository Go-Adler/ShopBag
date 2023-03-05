const express = require("express");

const productsRoute = require("./userRoutes/productsRoute")
const { handleOTPVerification, validateUserSignIn, validateUserSignUp } = require("../controller/userAccessController");
const { renderSignInPage, renderSignUpPage, renderOTPVerificationPage, renderOTPVerifiedPage, renderHomePage, renderProfilePage } = require("../controller/userController");
const { userSession } = require("../services/UserServices/session")
const { validateSignOut, validateSignIn, destroySession } =require("../middlewares/commonMiddlewares")

const route = express.Router();

route.use(userSession)

route.use("/products", validateSignOut,  productsRoute)

route.get("/signin", validateSignIn, renderSignInPage);
route.get("/signup", validateSignIn, renderSignUpPage);
route.get("/OTPVerification", validateSignIn, renderOTPVerificationPage);
route.get("/OTPVerified", validateSignIn, renderOTPVerifiedPage);
route.get("/home", validateSignOut, renderHomePage);
route.get("/logout", destroySession);
route.get("/profile", validateSignOut, renderProfilePage);

route.post("/OTPVerification", validateSignIn, handleOTPVerification);
route.post("/signin", validateSignIn, validateUserSignIn);
route.post("/signup", validateSignIn, validateUserSignUp);

module.exports = route;
