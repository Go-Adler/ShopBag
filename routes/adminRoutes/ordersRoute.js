import express from 'express'

import { renderOrdersPage, renderOrderDetailsPage } from "../../controller/adminControllers/ordersController.js"
export const router = express.Router()

router.get('/:id/:user', renderOrderDetailsPage)
router.get('/', renderOrdersPage)
