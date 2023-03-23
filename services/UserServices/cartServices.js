const { User } = require("../../models/userModel")
import { mongo } from "../../config/mongoose"

mongo();

// Get user cart
const getUserCart = async (id) => {
  try {
    const getCart = await User.findById(id)
      .select({ cart: 1, _id: 0 })
      .populate({
        path: "cart.product",
        match: { isDisabled: { $ne: true } },
      })

    const cart = getCart.cart.filter((item) => item.product)
    return cart
  } catch (error) {
    throw new Error(`Error getting cart items: ${error.message}`)
  }
}

// Get user address
const getUserAddress = async (id) => {
  try {
    const getCart = await User.findById(id).select({ address: 1, _id: 0 })

    return getCart
  } catch (error) {
    throw new Error(`Error getting cart items: ${error.message}`)
  }
}

// Get user cart
const clearCart = async (id) => {
  try {
    await User.findByIdAndUpdate(id, { cart: [] })
  } catch (error) {
    throw new Error(`Error getting cart items: ${error.message}`)
  }
}

// Quantity increment
const quantityUpdate = async (_id, product, quantity) => {
  try {
    await User.findOneAndUpdate(
      { _id, "cart.product": product },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    )
    return true
  } catch (error) {
    throw new Error(`Error adding to cart: ${error.message}`)
  }
}

module.exports = { getUserCart, quantityUpdate, clearCart, getUserAddress }
