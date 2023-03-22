const express = require("express")

const {
  handleChangePassword,
  resendOTP,
  handleOTPVerificationForgotPassword,
  validateUserEmailForgotPassword,
  handleOTPVerification,
  validateUserSignIn,
  validateUserSignUp,
} = require("../controller/userAccessController")
const {
  renderChangePassword,
  renderOTPVerificationPageForgotPassword,
  renderForgotPassword,
  renderSignInPage,
  renderSignUpPage,
  renderOTPVerificationPage,
  renderOTPVerifiedPage,
  renderHomePage,
} = require("../controller/userController")
const { userSession } = require("../services/UserServices/session")
const {
  validateSignOut,
  validateSignIn,
  destroySession,
  validateUserStats,
} = require("../middlewares/commonMiddlewares")

const cartRoute = require("./userRoutes/cartRoute")
const checkoutRoute = require("./userRoutes/checkoutRoute")
const ordersRoute = require("./userRoutes/ordersRoute")
const productsRoute = require("./userRoutes/productsRoute")
const wishlistRoute = require("./userRoutes/wishlistRoute")
const categoryRoute = require("./userRoutes/categoryRoute")
const profileRoute = require("./userRoutes/profileRoute")

const route = express.Router()

route.use(userSession)

route.use("/wishlist", validateSignOut, validateUserStats, wishlistRoute)
route.use("/orders", validateSignOut, validateUserStats, ordersRoute)
route.use("/products", validateSignOut, validateUserStats, productsRoute)
route.use("/cart", validateSignOut, validateUserStats, cartRoute)
route.use("/checkout", validateSignOut, validateUserStats, checkoutRoute)
route.use("/category", validateSignOut, validateUserStats, categoryRoute)
route.use("/profile", validateSignOut, validateUserStats, profileRoute)

route.get("/signin", validateSignIn, renderSignInPage)
route.get("/signup", validateSignIn, renderSignUpPage)
route.get("/forgot-password", validateSignIn, renderForgotPassword)
route.get("/OTPVerification", validateSignIn, renderOTPVerificationPage)
route.get("/OTPVerified", validateSignIn, renderOTPVerifiedPage)
route.get("/home", validateSignOut, validateUserStats, renderHomePage)
route.get("/logout", destroySession)
route.get(
  "/OTPVerificationForgotPassword",
  validateSignIn,
  renderOTPVerificationPageForgotPassword
)
route.get("/resend-otp", validateSignIn, resendOTP)
route.get("/change-password", validateSignIn, renderChangePassword)

route.post("/home", validateSignOut, validateUserStats, renderHomePage)
route.post("/change-password", validateSignIn, handleChangePassword)
route.post(
  "/OTPVerificationForgotPassword",
  validateSignIn,
  handleOTPVerificationForgotPassword
)
route.post("/forgot-password", validateSignIn, validateUserEmailForgotPassword)
route.post("/OTPVerification", validateSignIn, handleOTPVerification)
route.post("/signin", validateSignIn, validateUserSignIn)
route.post("/signup", validateSignIn, validateUserSignUp)

module.exports = route
