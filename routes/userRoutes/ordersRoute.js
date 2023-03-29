import express from 'express'

import { renderOrdersPage, renderOrdersDetailsPage } from '../../controller/userController/orderController.js'

export const router = express.Router()

router.get("/:id", renderOrdersDetailsPage)
router.get("/", renderOrdersPage)