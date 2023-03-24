import { User } from "../../models/userModel.js"
import { mongo } from "../../config/mongoose.js"

mongo();

// Add product to wishlist
export const wishlistAdd = async (id, wishlist) => {
  try {
    const getWishlist = await User.findById(id, "-_id wishlist")

    if (!getWishlist.wishlist.includes(wishlist)) {
     await User.findByIdAndUpdate(id, { $push: { wishlist } }, { new: true })
    }

    return true
  } catch (error) {
    console.error(`Error in add to wishlist: ${error.message}`)
    throw new Error(`Error in add to wishlist: ${error}`)
  }
}

// Remove product from wishlist
export const wishlistRemove = async (id, wishlist) => {
  try {
    const getWishlist = await User.findById(id, "-_id wishlist")

    if (getWishlist.wishlist.includes(wishlist)) {
      await User.findByIdAndUpdate(id, { $pull: { wishlist } })
    }
    return true
  } catch (error) {
    console.error(`Error in remove from wishlist: ${error.message}`)
    throw new Error(`Error in remove from wishlist: ${error}`)
  }
}

// Get wishlisted products
export const getWishlistedProducts = async (id) => {
  try {
    const wishlist = await User.findById(id, '-_id wishlist').populate('wishlist')
    return wishlist.wishlist
  } catch (error) {
    console.error(`Error in get wishlisted products: ${error.message}`)
    throw new Error(`Error in get wishlisted products: ${error}`)
  }
}

// Get all products
export const getWishlistedIDs = async (id) => {
  try {
    const wishlist = await User.findById(id, '-_id wishlist')
    return wishlist.wishlist
  } catch (error) {
    console.error(`Error in get wishlist product IDs: ${error.message}`)
    throw new Error(`Error in get wishlist product IDs: ${error}`)
  }
}

// Add product to cart
export const cartAdd = async (id, product) => {
  try {
    const getCart = await User.findById(id, "-_id cart")
    if (!getCart.cart.some(item => item.product == product )) {
      const cart = { product }
      await User.findByIdAndUpdate(id, { $push: { cart } })
    }
    return true
  } catch (error) {
    console.error(`Error in cart add: ${error.message}`)
    throw new Error(`Error in cart add: ${error}`)
  }
}

// Remove product from cart
export const cartRemove = async (id, product) => {
  try {
    const getCart = await User.findById(id, "-_id cart")
    if (getCart.cart.some(item => item.product == product )) {
      const cart = { product }
      await User.findByIdAndUpdate(id, { $pull: { cart } })
    }
    return true
  } catch (error) {
    console.error(`Error in cart remove: ${error.message}`)
    throw new Error(`Error in cart remove: ${error}`)
  }
}