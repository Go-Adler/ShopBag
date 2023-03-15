const { User } = require("../../models/userModel")
const db = require("../../config/mongoose")

db()

// Get user cart
const getUserCart =  async (id) => {
  try {
    const getCart = await User.findById(id, "-_id cart").populate('cart.product')
    return getCart.cart
  } catch (error) {
    res.send(`Error getting cart items: ${error.message}`)
  }
}

// Add quantity
const quantityIncrement = async (id, product, quantity) => {
  try {
    const getCart = await User.findById(id, "-_id cart")
      const cart = { product, quantity }
      await User.findByIdAndUpdate(id, { $push: { cart } })
    return true
  } catch (error) {
    throw new Error(`Error adding to cart: ${error.message}`)
  }
}

module.exports = { getUserCart, cartAdd }