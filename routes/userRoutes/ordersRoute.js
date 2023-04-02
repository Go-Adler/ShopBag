import express from 'express'
import { renderOrdersPage, renderOrdersDetailsPage, downloadInvoice, statusToReturned, statusToCancel } from '../../controller/userController/orderController.js'

export const router = express.Router()

router.get("/cancel/:orderId", statusToCancel)
router.get("/return/:orderId", statusToReturned)
router.get('/invoice-download/:orderId', downloadInvoice)
router.get("/:id", renderOrdersDetailsPage)
router.get("/", renderOrdersPage)