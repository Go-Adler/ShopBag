import express from 'express'

import { renderOrdersPage, renderOrderDetailsPage, orderToShipped, orderOutForDelivery } from "../../controller/adminControllers/ordersController.js"
export const router = express.Router()

router.get('/:_id/:userId/to-outForDelivery', orderOutForDelivery)
router.get('/:_id/:userId/to-shipped', orderToShipped)
router.get('/:_id/:userId', renderOrderDetailsPage)
router.get('/', renderOrdersPage)
