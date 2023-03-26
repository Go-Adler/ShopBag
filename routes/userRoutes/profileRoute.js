import express from 'express'

import { renderProfilePage } from '../../controller/userController.js'
import { renderAddressAddPage, addAddress, removeAddressOfUser, renderEditAddress, editaddress } from '../../controller/userController/profileController.js'

export const router = express.Router()

router.get("/address/edit/:id", renderEditAddress)
router.get("/add-address", renderAddressAddPage)
router.get("/", renderProfilePage)

router.post("/address/edit/:id", editaddress)
router.post("/add-address", addAddress)
router.post("/address/remove", removeAddressOfUser)