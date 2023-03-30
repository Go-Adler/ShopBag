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