const express = require("express");

const { handleOTPVerification, validateUserSignIn, validateUserSignUp } = require("../controller/userAccessController");
const { renderSignInPage, renderSignUpPage, renderOTPVerificationPage, renderOTPVerifiedPage, renderHomePage, renderProfilePage } = require("../controller/userController");
const { userSession } = require("../services/UserServices/session")
const { validateSessionSignOut, validateSessionSignIn, destroySession } =require("../middlewares/commonMiddlewares")

const route = express.Router();

route.use(userSession)

// route.use("/products", productsRoute)


route.get("/signin", validateSessionSignIn, renderSignInPage);
route.get("/signup", validateSessionSignIn, renderSignUpPage);
route.get("/OTPVerification", validateSessionSignIn, renderOTPVerificationPage);
route.get("/OTPVerified", validateSessionSignIn, renderOTPVerifiedPage);
route.get("/home", validateSessionSignOut, renderHomePage);
route.get("/logout", destroySession, renderSignInPage);
route.get("/profile", validateSessionSignOut, renderProfilePage);

route.post("/OTPVerification", validateSessionSignIn, handleOTPVerification);
route.post("/signin", validateSessionSignIn, validateUserSignIn);
route.post("/signup", validateSessionSignIn, validateUserSignUp);

module.exports = route;
