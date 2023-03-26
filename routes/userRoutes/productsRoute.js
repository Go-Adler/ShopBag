import express from 'express'
import {
  renderProductPage,
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
  addToCart,
  productSearch,
} from '../../controller/userController/productController.js'

export const router = express.Router()

router.get('/add-cart/:id', addToCart)
router.get('/remove-cart/:id', removeFromCart)
router.get('/:id', renderProductPage)

router.post('/search', productSearch)
router.post('/add-wishlist', addToWishlist)
router.post('/remove-wishlist', removeFromWishlist)
