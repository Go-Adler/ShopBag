import express from 'express'

import { renderReportPage, getSalesReport } from '../../controller/adminControllers/reportController.js'

export const router = express.Router()

router.get('/', renderReportPage)

router.post('/sales', getSalesReport)