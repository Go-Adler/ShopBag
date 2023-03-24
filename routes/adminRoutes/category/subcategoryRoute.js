import express from 'express'
import {
  renderSubcategoryAdd,
  subcategoryEdit,
  subcategoryEnable,
  subcategoryDisable,
  renderSubcategoryEdit,
  subcategoryAdd,
} from '../../../controller/adminControllers/subcategoryController.js'

export const router = express.Router()

router.get('/add', renderSubcategoryAdd)
router.get('/edit/:id', renderSubcategoryEdit)

router.post('/add', subcategoryAdd)
router.post('/edit', subcategoryEdit)
router.post('/enable', subcategoryEnable)
router.post('/disable', subcategoryDisable)
