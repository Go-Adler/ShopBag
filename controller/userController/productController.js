const { getProductWithId } = require("../../services/userServices/dataServices")
const {
  wishlistAdd,
  wishlistRemove,
  getWishlistedProducts,
  cartAdd,
  cartRemove
} = require("../../services/UserServices/productServices")


// Render product page
const renderProductPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const { id } = req.params
    const wishlist = await getWishlistedProducts(_id)
    const product = await getProductWithId(id)
    let isWishlist

    if (wishlist.includes(product._id)) {
      isWishlist = true
    }

    res.render("user/product", { name, product, isWishlist })
  } catch (error) {
    console.error(error)
    res.send(`Error loading products page: ${error.message}`)
  }
}

// Controller to add product to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.params
    await wishlistAdd(_id, id)
    res.redirect("/user/home")
  } catch (error) {
    console.error(error)
    res.send(`Error loading products page: ${error.message}`)
  }
}

// Controller to remove product from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.params
    await wishlistRemove(_id, id)
    res.redirect("/user/home")
  } catch (error) {
    console.error(error)
    res.send(`Error loading products page: ${error.message}`)
  }
}

// Function to add product to cart
const addToCart = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.params
    await cartAdd(_id, id)
    res.redirect(`/user/products/${id}`)
  } catch (error) {
    console.error(error)
    res.send(`Error adding product to cart: ${error.message}`)
  }
}

// Function to remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.params
    await cartRemove(_id, id)
    res.redirect(`/user/products/${id}`)
  } catch (error) {
    console.error(error)
    res.send(`Error removing product from cart: ${error.message}`)
  }
}

module.exports = { renderProductPage, addToWishlist, removeFromWishlist, addToCart, removeFromCart }
