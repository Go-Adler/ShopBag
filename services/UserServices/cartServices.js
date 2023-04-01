import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Get user cart
export const getCartPopulated = async (id) => {
  try {
    // Get user cart with populated products
    const getCart = await User.findById(id)
      .select({ cart: 1, _id: 0 })
      .populate({
        path: 'cart.product',
        match: { isDisabled: { $ne: true } },
      })
    return getCart.cart
  } catch (error) {
    console.error(`Error in get user cart: ${error.message}`)
    throw new Error(`Error in get user cart: ${error}`)
  }
}

// Get user cart
export const getCart = async (id) => {
  try {
    // Finding cart of a user
    let cart = await User.findById(id, { cart: 1, _id: 0 });
    
    // Returning only the cart array from the cart object received and re-assigning
    return cart.cart
  } catch (error) {
    console.error(`Error in get user cart: ${error.message}`)
    throw new Error(`Error in get user cart: ${error}`)
  }
}

// Get user all address
export const getUserAddress = async (id) => {
  try {
    const addressArray = await User.findById(id).select({ address: 1, _id: 0 })

    return addressArray
  } catch (error) {
    console.error(`Error in get all user address: ${error.message}`)
    throw new Error(`Error in get all user address: ${error}`)
  }
}

// Get user cart
export const clearCart = async (id) => {
  try {
    await User.findByIdAndUpdate(id, { cart: [] })
  } catch (error) {
    console.error(`Error in clear cart: ${error.message}`)
    throw new Error(`Error in clear cart: ${error}`)
  }
}

// Quantity increment
export const quantityUpdate = async (_id, product, quantity) => {
  try {
    await User.findOneAndUpdate(
      { _id, 'cart.product': product },
      { $set: { 'cart.$.quantity': quantity } },
      { new: true }
    )
    return true
  } catch (error) {
    console.error(`Error in quantity update: ${error.message}`)
    throw new Error(`Error in quantity update: ${error}`)
  }
}