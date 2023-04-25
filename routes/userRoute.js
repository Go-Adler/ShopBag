import express from 'express'

import {
  handleChangePassword,
  resendOTP,
  handleOTPVerificationForgotPassword,
  validateUserEmailForgotPassword,
  handleOTPVerification,
  validateUserSignIn,
  validateUserSignUp,
  logout
} from '../controller/userAccessController.js'
import {
  renderChangePassword,
  renderOTPVerificationPageForgotPassword,
  renderForgotPassword,
  renderSignInPage,
  renderSignUpPage,
  renderOTPVerificationPage,
  renderOTPVerifiedPage,
  renderHomePage,
  rediretToHomePage
} from '../controller/userController.js'
import { userSession } from '../services/UserServices/session.js'
import {
  validateSignOut,
  validateSignIn,
  validateUserStats,
  errorHandler1,
  errorHandler2
} from '../middlewares/commonMiddlewares.js'

import { router as cartRoute } from './userRoutes/cartRoute.js'
import { router as checkoutRoute } from './userRoutes/checkoutRoute.js'
import { router as ordersRoute } from './userRoutes/ordersRoute.js'
import { router as productsRoute } from './userRoutes/productsRoute.js'
import { router as wishlistRoute } from './userRoutes/wishlistRoute.js'
import { router as categoryRoute } from './userRoutes/categoryRoute.js'
import { router as profileRoute } from './userRoutes/profileRoute.js'
import { router as walletRoute } from './userRoutes/walletRoute.js'

export const router = express.Router()

router.use(userSession)

router.use('/wishlist', validateSignOut, validateUserStats, wishlistRoute)
router.use('/orders', validateSignOut, validateUserStats, ordersRoute)
router.use('/products', validateSignOut, validateUserStats, productsRoute)
router.use('/cart', validateSignOut, validateUserStats, cartRoute)
router.use('/checkout', validateSignOut, validateUserStats, checkoutRoute)
router.use('/category', validateSignOut, validateUserStats, categoryRoute)
router.use('/profile', validateSignOut, validateUserStats, profileRoute)
router.use('/wallet', validateSignOut, validateUserStats, walletRoute)

router.get('/signin', renderSignInPage)
router.get('/signup', validateSignIn, renderSignUpPage)
router.get('/forgot-password', validateSignIn, renderForgotPassword)
router.get('/OTPVerification', validateSignIn, renderOTPVerificationPage)
router.get('/OTPVerified', validateSignIn, renderOTPVerifiedPage)
router.get('/home',  renderHomePage)
router.get('/', renderHomePage)

router.get('/logout', logout)
router.get('/OTPVerificationForgotPassword',validateSignIn,renderOTPVerificationPageForgotPassword)
router.get('/resend-otp', validateSignIn, resendOTP)
router.get('/change-password', validateSignIn, renderChangePassword)

router.post('/change-password', validateSignIn, handleChangePassword)
router.post('/OTPVerificationForgotPassword', validateSignIn, handleOTPVerificationForgotPassword)
router.post('/forgot-password', validateSignIn, validateUserEmailForgotPassword)
router.post('/OTPVerification', validateSignIn, handleOTPVerification)
router.post('/signin', validateSignIn, validateUserSignIn)
router.post('/signup', validateSignIn, validateUserSignUp)

router.use(errorHandler1, errorHandler2)
