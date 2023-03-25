import express from 'express'
import { getProductsInCategory } from '../../controller/userController/categoryController.js'

export const router = express.Router()

router.post("/", getProductsInCategory)