const { User } = require("../../models/userModel")
const db = require("../../config/mongoose")

db()

const getUserCart =  async (id) => {
  try {
    const getCart = await User.findById(id, "-_id cart").populate('cart')
    return getCart.cart
  } catch (error) {
    res.send(`Error getting cart items: ${error.message}`)
  }
}

module.exports = { getUserCart }