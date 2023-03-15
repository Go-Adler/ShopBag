const { User } = require("../../models/userModel")
const Product = require("../../models/adminModel/productsModel")

const db = require("../../config/mongoose")

db()

// Add product to wishlist
const wishlistAdd = async (id, wishlist) => {
  try {
    const getWishlist = await User.findById(id, "-_id wishlist")

    if (!getWishlist.wishlist.includes(wishlist)) {
      await User.findByIdAndUpdate(id, { $push: { wishlist } })
    }
    return true
  } catch (error) {
    throw new Error(`Error adding to wishlist: ${error.message}`)
  }
}

// Remove product from wishlist
const wishlistRemove = async (id, wishlist) => {
  try {
    const getWishlist = await User.findById(id, "-_id wishlist")

    if (getWishlist.wishlist.includes(wishlist)) {
      await User.findByIdAndUpdate(id, { $pull: { wishlist } })
    }
    return true
  } catch (error) {
    throw new Error(`Error removing from wishlist: ${error.message}`)
  }
}

// Get wishlisted products
const getWishlistedProducts = async (id) => {
  try {
    const wishlist = await User.findById(id, '-_id wishlist').populate('wishlist')
    return wishlist.wishlist
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products added to wishlist: ${error.message}`)
  }
}

// Get all products
const getWishlistedIDs = async (id) => {
  try {
    const wishlist = await User.findById(id, '-_id wishlist')
    return wishlist.wishlist
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products added to wishlist: ${error.message}`)
  }
}

// Add product to cart
const cartAdd = async (id, product) => {
  try {
    const getCart = await User.findById(id, "-_id cart")
    if (!getCart.cart.some(item => item.product == product )) {
      const cart = { product }
      await User.findByIdAndUpdate(id, { $push: { cart } })
    }
    return true
  } catch (error) {
    throw new Error(`Error adding to cart: ${error.message}`)
  }
}

// Remove product from cart
const cartRemove = async (id, product) => {
  try {
    const getCart = await User.findById(id, "-_id cart")
    if (getCart.cart.some(item => item.product == product )) {
      const cart = { product }
      await User.findByIdAndUpdate(id, { $pull: { cart } })
    }
    return true
  } catch (error) {
    throw new Error(`Error removing from cart: ${error.message}`)
  }
}

module.exports = { wishlistRemove, wishlistAdd, getWishlistedProducts, cartAdd, cartRemove, getWishlistedIDs }
