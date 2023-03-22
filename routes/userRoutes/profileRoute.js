const express = require("express")
const { renderProfilePage } = require("../../controller/userController")
const { renderAddressAddPage, addAddress } = require("../../controller/userController/profileController")

const router = express.Router()

router.get("/add-address", renderAddressAddPage)
router.get("/", renderProfilePage)

router.post("/add-address", addAddress)

module.exports = router