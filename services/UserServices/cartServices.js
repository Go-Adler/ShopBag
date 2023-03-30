import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Get user cart
export const getUserCart = async (id) => {
  try {
    const getCart = await User.findById(id)
      .select({ cart: 1, _id: 0 })
      .populate({
        path: 'cart.product',
        match: { isDisabled: { $ne: true } },
      })

    const cart = getCart.cart.filter((item) => item.product)
    return cart
  } catch (error) {
    console.error(`Error in get user cart: ${error.message}`)
    throw new Error(`Error in get user cart: ${error}`)
  }
}

// Get user cart
export const getCartProducts = async (id) => {
  try {
    let cart = await User.findById(id, { cart: 1, _id: 0 });
    cart = cart.cart
    let kart = []

    // Change to aggregate
    cart.forEach((element) => {
      kart.push({
        product:element.product,
        quantity:element.quantity
      })
    });
    return cart
  } catch (error) {
    console.error(`Error in get user cart: ${error.message}`)
    throw new Error(`Error in get user cart: ${error}`)
  }
}

// Get user address
export const getUserAddress = async (id) => {
  try {
    const getCart = await User.findById(id).select({ address: 1, _id: 0 })

    return getCart
  } catch (error) {
    console.error(`Error in get user address: ${error.message}`)
    throw new Error(`Error in get user address: ${error}`)
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