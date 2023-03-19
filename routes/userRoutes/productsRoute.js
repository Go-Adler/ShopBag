const express = require("express")
const {
  renderProductPage,
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
  addToCart,
  productSortByNameAToZ,
  productSortByNameZToA
} = require("../../controller/userController/productController")

const router = express.Router()

router.get("/add-cart/:id", addToCart)
router.get("/remove-cart/:id", removeFromCart)
router.get("/sortByNameAToZ", productSortByNameAToZ)
router.get("/sortByNameZToA", productSortByNameZToA)
router.get("/:id", renderProductPage)

router.post("/add-wishlist", addToWishlist)
router.post("/remove-wishlist", removeFromWishlist)

module.exports = router
