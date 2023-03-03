const Product = require("../../models/adminModel/productsModel");
const db = require("../../config/mongoose");

db();


const addProduct = async (product) => {
  try {
    const { name, price, description, stock, images } = product

    await Product.create({
      name,
      price,
      description,
      stock,
      images
    });

    return true;
  } catch (error) {
    throw new Error(`Error adding products: ${error.message}`)
  }
};

const getAllProducts = async _id => {
  try {
    const query = _id ? { _id } : {}
    const product = await Product.findOne(query)
    return product
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting products: ${error.message}`)
  }
}

module.exports = {
  addProduct,
  getAllProducts
}