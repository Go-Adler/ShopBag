import express from 'express'

import { router as subcategoryRoute } from './category/subcategoryRoute.js'
import { renderCategoryControlPage } from '../../controller/adminController.js'
import {
  renderCategoryAdd,
  categoryAdd,
  categoryDisable,
  categoryEnable,
  renderCategoryEdit,
  categoryEdit,
} from '../../controller/adminControllers/categoryController.js'

export const router = express.Router()

router.use('/subcategory', subcategoryRoute)

router.get('/', renderCategoryControlPage)
router.get('/add', renderCategoryAdd)
router.get('/edit/:id', renderCategoryEdit)

router.post('/edit/:id', categoryEdit)
router.post('/add', categoryAdd)
router.post('/disable', categoryDisable)
router.post('/enable', categoryEnable)
