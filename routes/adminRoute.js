import express from 'express'


import { router as userRoute } from './adminRoutes/usersRoute.js';
import { router as categoryRoute } from './adminRoutes/categoryRoute.js';
import { router as productRoute } from './adminRoutes/productsRoute.js';
import { router as couponRoute } from './adminRoutes/couponRoute.js';

import { adminSession } from '../services/adminServices/session.js'
import { signInValidate } from '../controller/adminAccessController.js'
import { renderSignInPage, renderHomePage, renderUserProfilePage } from '../controller/adminController.js'
import { validateSignIn, validateSignOut, destroySession } from '../middlewares/commonMiddlewares.js'

export const router = express.Router()

router.use(adminSession)

router.use("/users", validateSignOut, userRoute)
router.use("/category", validateSignOut, categoryRoute)
router.use("/products", validateSignOut, productRoute)
router.use("/coupon", validateSignOut, couponRoute)

router.get("/signin", validateSignIn, renderSignInPage)
router.get("/home", validateSignOut, renderHomePage)
router.get("/profile", validateSignOut, renderUserProfilePage)
router.get("/logout", destroySession)

router.post("/signin", validateSignIn, signInValidate)