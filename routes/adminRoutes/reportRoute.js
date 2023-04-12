import express from 'express'

import { renderReportPage, getSalesReport, downloadReport } from '../../controller/adminControllers/reportController.js'

export const router = express.Router()

router.get('/', renderReportPage)

router.post('/sales/download', downloadReport)
router.post('/sales', getSalesReport)