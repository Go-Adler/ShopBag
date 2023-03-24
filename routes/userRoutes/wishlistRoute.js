import express from 'express'

import { renderWishlistPage } from '../../controller/userController/wishListController.js'

export const router = express.Router()

router.get("/", renderWishlistPage)