import express from 'express'

import { renderOrdersPage, renderOrderDetailsPage } from "../../controller/adminControllers/ordersController.js"
export const router = express.Router()

router.get('/:_id/:userId', renderOrderDetailsPage)
router.get('/', renderOrdersPage)
