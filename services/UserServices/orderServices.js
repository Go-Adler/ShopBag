const { User } = require("../../models/userModel");
import { mongo } from "../config/mongoose"

mongo();

const getOrders = async (id) => {
  try {
    const orders = await User.findById(id, { orders: 1, _id: 0}).populate("orders.products.product");
    console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log(orders.orders, 'orders');
    console.log(orders.orders[0].products, 'products');
    console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');

    return orders.orders
  } catch (error) {
    console.log("Error finding user data from database: ", error);
    return false;
  }
};

module.exports = {
  getOrders
}