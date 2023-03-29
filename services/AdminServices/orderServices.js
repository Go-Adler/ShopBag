import { User } from "../../models/userModel.js"

// Service to get all orders of a user
export const getOrders = async () => {
  try {
    const orders = await User.find({}, { orders: 1 }).populate(
    { path: 'orders.products.product'}
    )
    return orders
  } catch (error) {
    console.error(`Error in get all orders, #service ${error.message}`)
    throw new Error(`Error in get all orders, #service ${error}`)
  }
}

// Service to get all orders of a user
export const getUserOrder = async (id, userId) => {
  try {
    const order = await User.findOne(
      { _id: userId, 'orders._id': id },
      { 'orders.$': 1,  _id: 0 }
    )
    .populate({
      path: 'orders.products.product',
    })
    // const orders = await User.findOne({_id: userId, "order._id": id}, { "orders.$": 1 }).populate(
    // { path: 'orders.products.product'}
    // )
    return order.orders[0]
  } catch (error) {
    console.error(`Error in get all orders, #service ${error.message}`)
    throw new Error(`Error in get all orders, #service ${error}`)
  }
}