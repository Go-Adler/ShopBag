import express from 'express'
import {
  renderAddCouponPage,
  renderCouponPage,
  couponAddController,
  couponEnable,
  couponDisable,
  renderEditCoupon,
  couponEditController
} from '../../controller/adminControllers/couponController.js'

export const router = express.Router()

router.get('/enable/:id', couponEnable)
router.get('/edit/:id', renderEditCoupon)
router.get('/disable/:id', couponDisable)
router.get('/add', renderAddCouponPage)
router.get('/', renderCouponPage)

router.post('/edit/:id', couponEditController)
router.post('/add', couponAddController)