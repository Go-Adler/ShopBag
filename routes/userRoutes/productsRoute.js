const express = require("express")
const { renderProductPage, addToWishlist, removeFromWishlist, removeFromCart, addToCart } = require("../../controller/userController/productController")

const router = express.Router()

router.get("/add-wishlist/:id", addToWishlist)
router.get("/remove-wishlist/:id", removeFromWishlist)
router.get("/add-cart/:id", addToCart)
router.get("/remove-cart/:id", removeFromCart)
router.get("/:id", renderProductPage)


module.exports = router 