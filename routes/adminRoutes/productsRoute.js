import express from 'express'
import { upload, sharpedImage } from '../../middlewares/adminMiddlewares.js'
import {
  productEdit,
  renderProductEditPage,
  renderProductsPage,
  renderProductAddPage,
  productAdd,
  disableProduct,
  enableProduct,
} from '../../controller/adminControllers/productsController.js'

export const router = express.Router()

router.get('/add', renderProductAddPage)
router.get('/edit/:id', renderProductEditPage)
router.get('/', renderProductsPage)

router.post('/', renderProductsPage)
router.post('/edit/:id', upload, sharpedImage, productEdit)
router.post('/add', upload, sharpedImage, productAdd)
router.post('/disable', disableProduct)
router.post('/enable', enableProduct)
router.post('/enable', enableProduct)
