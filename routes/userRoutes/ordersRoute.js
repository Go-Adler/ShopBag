import express from 'express'
import { renderOrdersPage, renderOrdersDetailsPage, downloadInvoice } from '../../controller/userController/orderController.js'

export const router = express.Router()

router.get('/invoice-download/:orderId', downloadInvoice)
router.get("/:id", renderOrdersDetailsPage)
router.get("/", renderOrdersPage)