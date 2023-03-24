import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

export const getOrders = async (id) => {
  try {
    const orders = await User.findById(id, { orders: 1, _id: 0 }).populate(
      'orders.products.product'
    )
    return orders.orders
  } catch (error) {
    console.error(`Error in search: ${error.message}`)
    throw new Error(`Error in create user: ${error}`)
  }
}