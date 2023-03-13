const express = require("express")
const { renderProductPage, toggleWishList } = require("../../controller/userController/productController")

const router = express.Router()

router.get("/:id", renderProductPage)
router.get("/wishlist/:id", toggleWishList)

module.exports = router