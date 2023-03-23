import { User } from '../../models/userModel'
import { mongo } from '../config/mongoose'

mongo()

export const getOrders = async (id) => {
  try {
    const orders = await User.findById(id, { orders: 1, _id: 0 }).populate(
      'orders.products.product'
    )
    return orders.orders
  } catch (error) {
    console.log('Error finding user data from database: ', error)
    return false
  }
}