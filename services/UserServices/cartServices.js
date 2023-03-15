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

// Quantity increment
const quantityUpdate = async (_id, product, quantity) => {
  try {
    await User.findOneAndUpdate({ _id, 'cart.product': product }, { $set: { 'cart.$.quantity': quantity } }, { new: true })
    return true
  } catch (error) {
    throw new Error(`Error adding to cart: ${error.message}`)
  }
}

module.exports = { getUserCart, quantityUpdate }