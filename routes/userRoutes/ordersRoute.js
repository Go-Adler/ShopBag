import express from 'express'

import { renderOrdersPage } from '../../controller/userController/orderController.js'

export const router = express.Router()

router.get("/", renderOrdersPage)