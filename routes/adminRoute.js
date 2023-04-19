import express from 'express'

import { router as userRoute } from './adminRoutes/usersRoute.js';
import { router as categoryRoute } from './adminRoutes/categoryRoute.js';
import { router as productRoute } from './adminRoutes/productsRoute.js';
import { router as couponRoute } from './adminRoutes/couponRoute.js';
import { router as ordersRoute } from './adminRoutes/ordersRoute.js';
import { router as dashboardRoute } from './adminRoutes/dashboardRoute.js'
import { router as reportRoute } from './adminRoutes/reportRoute.js'

import { adminSession } from '../services/adminServices/session.js'
import { signInValidate } from '../controller/adminAccessController.js'
import { renderSignInPage, renderHomePage, renderUserProfilePage } from '../controller/adminController.js'
import { validateSignIn, validateSignOut } from '../middlewares/commonMiddlewares.js'
import { errorHandler1, errorHandler2 } from '../middlewares/commonMiddlewares.js';
import { logout } from '../controller/userAccessController.js';

export const router = express.Router()

router.use(adminSession)

router.use("/users", validateSignOut, userRoute)
router.use("/category", validateSignOut, categoryRoute)
router.use("/products", validateSignOut, productRoute)
router.use("/coupon", validateSignOut, couponRoute)
router.use("/orders", validateSignOut, ordersRoute)
router.use("/dashboard", validateSignOut, dashboardRoute)
router.use("/report", validateSignOut, reportRoute)

router.get("/signin", validateSignIn, renderSignInPage)
router.get("/home", validateSignOut, renderHomePage)
router.get("/profile", validateSignOut, renderUserProfilePage)
router.get("/logout", logout)

router.post("/signin", validateSignIn, signInValidate)

router.use(errorHandler1, errorHandler2)