import { User } from "../../models/userModel.js"
import { Category } from '../../models/adminModel/categoryModel.js'

// Service to get all orders of a user
export const getOrders = async () => {
  try {
    // Getting orders from every user
    let orders = await User.find({}, { orders: 1, _id: 0 }).populate(
    { path: 'orders.products.product' }
    )
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

// Service to get all orders of a user
export const getMonthlySales = async () => {
  try {
    // Getting orders from every user
    let orders = await User.find({}, { orders: 1, _id: 0 })
    let allOrders = []
    orders.forEach(user => {
      allOrders = allOrders.concat(user.orders)
    })


    const monthlySales = allOrders.reduce((acc, order) => {
      const date = new Date(order.orderDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;
      
      if (!acc[key]) {
        acc[key] = { year, month, total: 0 };
      }
      
      acc[key].total += order.total;
      
      return acc;
    }, {});
    return Object.values(monthlySales)
  } catch (error) {
    console.error(`Error in get all orders, #service ${error.message}`)
    throw new Error(`Error in get all orders, #service ${error}`)
  }
}

export const getCategorySales = async () => {
  try {
    let categoryArray = []
    let subcategoryArray = []

      // Getting orders from every user
      let orders = await User.find({}, { orders: 1, _id: 0 }).populate({
        path: 'orders.products.product' 
      })


      orders.forEach(user => {
        user.orders.forEach(order => {
          order.products.forEach(product => {
            subcategoryArray = subcategoryArray.concat(product.product.productSubcategory);
            categoryArray = categoryArray.concat(product.product.productCategory);
          })
        })
      })

    let categoryCounts = {};

    for (let category of categoryArray) {

      // Convert the category to a string
      let key = category.toString();

      // Check if the key already exists in the object
      if (categoryCounts.hasOwnProperty(key)) {

        // Increment the count by one
        categoryCounts[key]++;
      } else {
        // Initialize the count to one
        categoryCounts[key] = 1;
      }
    }

    let subcategoryCounts = {}
    
    for (let category of subcategoryArray) {

      // Convert the category to a string
      let key = category.toString();

      // Check if the key already exists in the object
      if (subcategoryCounts.hasOwnProperty(key)) {

        // Increment the count by one
        subcategoryCounts[key]++;
      } else {
        // Initialize the count to one
        subcategoryCounts[key] = 1;
      }
    }

    // Define an async function to find the name by id
    const findNameById = async (id) => {
      // Find the category by id using mongoose
      let category = await Category.findById(id);

      // Check if the category exists
      if (category) {
        // Return the name of the category
        return category.name;
      } else {
        // Handle the case when the id has no matching category
        console.log("No category found for id: " + id);
        return null;
      }
    }
    categoryArray = []
    // Loop through the object keys (ids)
    for (let id of Object.keys(categoryCounts)) {
      // Call the findNameById function with await
      let name = await findNameById(id);

      // Check if the name is valid
      if (name) {
        // Store the count with the name as the key
        categoryArray[name] = categoryCounts[id];
    }
}
    
    console.log(categoryArray, 91);
    console.log(subcategoryCounts, 91);

  } catch (error) {
    console.error(`Error in get all orders, #service ${error.message}`)
    throw new Error(`Error in get all orders, #service ${error}`)
  }
}