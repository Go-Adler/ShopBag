import express from 'express'
import {
  renderAddCouponPage,
  renderCouponPage,
} from '../../controller/adminControllers/couponController.js'

export const router = express.Router()

router.get('/add', renderAddCouponPage)
router.get('/', renderCouponPage)