const Product = require("../../models/adminModel/productsModel");
const db = require("../../config/mongoose");

db();

const add = async (product) => {
  try {
    await Product.Product.create({
      name: product.productName,
      price: product.productPrice,
      description: product.productDescription,
      stock: product.productStock,
      image: product.productImage,
      isInStock: 1,
      isDisabled: 0,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const data = async () => {
  try {
    const products = await Product.Product.find()
    return products
  } catch (error) {
    console.error(error);
    return false
  }
}

const product = async (id) => {
  try {
    const product = await Product.Product.findOne({_id: id})
    return product
  } catch (error) {
    console.error(error);
    return false
  }
}

module.exports = {
  add,
  data,
  product
}