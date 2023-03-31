import express from 'express'
import { renderOrdersPage, renderOrdersDetailsPage, downloadInvoice } from '../../controller/userController/orderController.js'

export const router = express.Router()

router.get('/download-invoice', downloadInvoice)
router.get("/:id", renderOrdersDetailsPage)
router.get("/", renderOrdersPage)