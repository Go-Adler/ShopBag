import express from 'express'
import { upload } from '../../middlewares/adminMiddlewares.js'
import {
  productEdit,
  renderProductEditPage,
  renderProductsPage,
  renderProductAddPage,
  productAdd,
  disableProduct,
  enableProduct,
  getSubcatergoriesOfCategory
} from '../../controller/adminControllers/productsController.js'

export const router = express.Router()

router.get('/add/:id', getSubcatergoriesOfCategory)
router.get('/add', renderProductAddPage)
router.get('/edit/:id', renderProductEditPage)
router.get('/', renderProductsPage)

router.post('/', renderProductsPage)
router.post('/edit/:id', upload, productEdit)
router.post('/add', upload, productAdd)
router.post('/disable', disableProduct)
router.post('/enable', enableProduct)
router.post('/enable', enableProduct)
