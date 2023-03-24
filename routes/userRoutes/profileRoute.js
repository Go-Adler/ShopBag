import express from 'express'

import { renderProfilePage } from '../../controller/userController.js'
import { renderAddressAddPage, addAddress } from '../../controller/userController/profileController.js'

export const router = express.Router()

router.get("/add-address", renderAddressAddPage)
router.get("/", renderProfilePage)

router.post("/add-address", addAddress)