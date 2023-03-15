const Product = require("../../models/adminModel/productsModel");
const db = require("../../config/mongoose");

db();

// Get products form grocery
const quantityUpdate = async (_id, product, quantity) => {
  try {
    const productData = await Product.find({ _id }).populate('productCategory').populate('productSubcategory')
    await Product.findOneAndUpdate({ _id, 'cart.product': product }, { $set: { 'cart.$.quantity': quantity } }, { new: true })
    return true
  } catch (error) {
    throw new Error(`Error adding to cart: ${error.message}`)
  }
}

// Get all products
const getAllProducts = async _id => {
  try {
    const query = _id ? { _id } : {}
    const products = await Product.find(query)
    return products
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting products: ${error.message}`)
  }
}

// Get all products in a category
const getCategoryProducts = async (productCategory) => {
  try {
    const products = await Product.find({ productCategory }).populate('productCategory').populate('productSubcategory')
    return products
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products added to wishlist: ${error.message}`)
  }
}

// // Get category name
// const getCategoryName = async (productCategory) => {
//   try {
//    const name = await Product.find({ productCategory }).populate('productCategory', 'name').select('-_id productCategory.name')
//    console.log(name, 'nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
//   } catch (error) {
//     console.error(error)
//     throw new Error(`Error getting products added to wishlist: ${error.message}`)
//   }
// }
module.exports = { getCategoryProducts }