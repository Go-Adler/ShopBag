import { User } from "../../models/userModel.js"

// Service to get all orders of a user
export const getOrders = async () => {
  try {
    // Getting orders from every user
    let orders = await User.find({}, { orders: 1, _id: 0 }).populate(
    { path: 'orders.products.product' }
    )
    // .then(ordersArray => {
    //   return ordersArray.orders.sort((a, b) => b.orderDate - a.orderDate);
    // });

    // Merging orders of every user into an array
    let allOrders = []
    orders.forEach(user => {
      allOrders = allOrders.concat(user.orders)
    })
    allOrders.sort((a, b) => b.orderDate - a.orderDate)
    return allOrders
  } catch (error) {
    console.error(`Error in get all orders, #service ${error.message}`)
    throw new Error(`Error in get all orders, #service ${error}`)
  }
}