import express from 'express'

import { renderProfilePage } from '../../controller/userController.js'
import { renderAddressAddPage, handleUserEdit, renderUserEditPage, addAddress, removeAddressOfUser, renderEditAddress, editAddress } from '../../controller/userController/profileController.js'

export const router = express.Router()

router.get("/edit", renderUserEditPage)
router.get("/address/edit/:id", renderEditAddress)
router.get("/add-address", renderAddressAddPage)
router.get("/", renderProfilePage)

router.post("/edit", handleUserEdit)
router.post("/address/edit/:id", editAddress)
router.post("/add-address", addAddress)
router.post("/address/remove", removeAddressOfUser)