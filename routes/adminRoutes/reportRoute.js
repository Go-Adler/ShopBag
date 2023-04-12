import express from 'express'

import { renderReportPage } from '../../controller/adminControllers/reportController.js'

export const router = express.Router()

router.get('/', renderReportPage)