const express = require("express")
const { renderWishlistPage } = require("../../controller/userController/wishListController")

const router = express.Router()

router.get("/", renderWishlistPage)

module.exports = router