import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Service to get all orders of a user
export const getOrders = async (id) => {
  try {
    const orders = await User.findById(id, { orders: 1, _id: 0 })
    .populate('orders.products.product')
    .then(ordersArray => {
      return ordersArray.orders.sort((a, b) => b.orderDate - a.orderDate);
    });
    return orders
  } catch (error) {
    console.error(`Error in get all orders, #service ${error.message}`)
    throw new Error(`Error in get all orders, #service ${error}`)
  }
}

// Service to get order details
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
    return order
  } catch (error) {
    console.error(`Error in get order detail, #service ${error.message}`)
    throw new Error(`Error in get order detail #service ${error}`)
  }
}

// Service to get address
export const getAddress = async (_id, address) => {
  try {
    address = await User.findOne(
      { _id, 'address._id': address },
      { 'address.$': 1, _id: 0 }
      )
      address = address.address[0]
      return address
  } catch (error) {
    console.error(`Error in get order detail, #service ${error.message}`)
    throw new Error(`Error in get order detail #service ${error}`)
  }
}

// Service to change order status to shipped
export const toShipped = async (_id, orderId) => {
  try {
    // Changing order statust to shipped
    await User.findOneAndUpdate(
      { _id, 'orders._id': orderId },
      { 'orders.$.orderStatus': 'shipped'  }
    )
    return
  } catch (error) {
    console.error(`Error in change in order status to shipped, #service ${error.message}`)
    throw new Error(`Errorin change in order status to shipped, #service ${error}`)
  }
}

// Service to change order status to out for delivery
export const toOutForDelivery = async (_id, orderId) => {
  try {
    // Changing order statust to shipped
    await User.findOneAndUpdate(
      { _id, 'orders._id': orderId },
      { 'orders.$.orderStatus': 'outForDelivery'  }
    )
    return
  } catch (error) {
    console.error(`Error in change in order status to out for delivery, #service ${error.message}`)
    throw new Error(`Error in change in order status to out for delivery, #service ${error}`)
  }
}

// Service to change order status to out for delivery
export const toDelivered = async (_id, orderId) => {
  try {
    // Changing order statust to shipped
    await User.findOneAndUpdate(
      { _id, 'orders._id': orderId },
      { 'orders.$.orderStatus': 'delivered'  }
    )
    return
  } catch (error) {
    console.error(`Error in change in order status to delivered, #service ${error.message}`)
    throw new Error(`Error in change in order status to delivered, #service ${error}`)
  }
}

// Service to change order status to returned
export const toReturned = async (_id, orderId) => {
  try {
    // Changing order status to returned
    await User.findOneAndUpdate(
      { _id, 'orders._id': orderId },
      { 'orders.$.orderStatus': 'returned'  }
    )
    return
  } catch (error) {
    console.error(`Error in change in order status to delivered, #orderServices ${error.message}`)
    throw new Error(`Error in change in order status to delivered, #orderServices ${error}`)
  }
}

// Service to change order status to cancelled
export const toCancelled = async (_id, orderId) => {
  try {
    // Changing order status to cancelled
    await User.findOneAndUpdate(
      { _id, 'orders._id': orderId },
      { 'orders.$.orderStatus': 'cancelled'  }
    )
    return
  } catch (error) {
    console.error(`Error in change in order status to cancelled, #orderServices ${error.message}`)
    throw new Error(`Error in change in order status to cancelled, #orderServices ${error}`)
  }
}