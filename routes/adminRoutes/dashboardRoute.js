import express from 'express'

import { getTotalDashboard } from '../../controller/adminControllers/dashboardController.js'

export const router = express.Router()

router.get('/', getTotalDashboard)