import express from 'express'

import { renderCategory } from '../../controller/userController/categoryController.js'

export const router = express.Router()

router.get("/:id", renderCategory)