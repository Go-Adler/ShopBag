import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Service to get all orders of a user
export const getOrders = async (id) => {
  try {
    const orders = await User.ad
    console.log(orders, 12);
    return orders.orders
  } catch (error) {
    console.error(`Error in get all orders, #service ${error.message}`)
    throw new Error(`Error in get all orders, #service ${error}`)
  }
}

// Service to get order details and address
export const getOrder = async (_id, orderId) => {
  try {
    // Fetching order details
    let order = await User.findOne(
      { _id, 'orders._id': orderId },
      { 'orders.$': 1,  _id: 0 }
    )
    .populate({
      path: 'orders.products.product',
    })
    // Getting only the element from the orders array inside the returned object - which return only one document inside an array.
    order = order.orders[0]
    // Getting address id from order details
    let { address } = order
    // Getting address from user
    address = await User.findOne(
      { _id, 'address._id': address },
      { 'address.$': 1, _id: 0 }
      )

      address = address.address[0]
    return { address, order }
  } catch (error) {
    console.error(`Error in get order detail, #service ${error.message}`)
    throw new Error(`Error in get order detail #service ${error}`)
  }
}