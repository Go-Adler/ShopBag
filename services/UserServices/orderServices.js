import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Service to get all orders of a user
export const getOrders = async (id) => {
  try {
    const orders = await User.findById(id, { orders: 1, _id: 0 }).populate(
      'orders.products.product'
    )
    return orders.orders
  } catch (error) {
    console.error(`Error in get all orders, #service ${error.message}`)
    throw new Error(`Error in get all orders, #service ${error}`)
  }
}

// Service to get order detail by Id
export const getOrder = async (id, orderId) => {
  try {
    const order = await User.findOne(
      { _id: id, 'orders._id': orderId },
      { 'orders.$': 1,  _id: 0 }
    )
    .populate({
      path: 'orders.products.product',
    })
    console.log(order, '23');
    
    return order.orders[0]
  } catch (error) {
    console.error(`Error in get order detail, #service ${error.message}`)
    throw new Error(`Error in get order detail #service ${error}`)
  }
}