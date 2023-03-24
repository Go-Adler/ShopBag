import express from 'express'

import {
  renderCartPage,
  decrementQuantity,
  incrementQuantity,
} from '../../controller/userController/cartController.js'

export const router = express.Router()

router.get('/', renderCartPage)

router.post('/increment-quantity', incrementQuantity)
router.post('/decrement-quantity', decrementQuantity)
