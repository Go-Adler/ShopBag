const Product = require("../../models/adminModel/productsModel");
const db = require("../../config/mongoose");

db();

const addProduct = async (product) => {
  try {
    const { productName, price, description, stock, images, productCategory, productSubcategory } = product

    await Product.create({
      productName,
      price,
      description,
      stock,
      images,
      productCategory,
      productSubcategory
    });

    return true;
  } catch (error) {
    throw new Error(`Error adding products: ${error.message}`)
  }
};

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

// Get product
const getProduct = async id => {
  try {
    const product = await Product.findById(id).populate('productCategory').populate('productSubcategory')
    console.log(product, 'porrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    return product
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting product: ${error.message}`)
  }
}

// Function to disable product
const productDisable = async id => {
  try {
    const product = await Product.findById(id);

    product.isDisabled = true;
    await product.save();
    return true;
  } catch (error) {
    console.log("Error disabling product: ", error);
    return false;
  }
};

// Function to disable product
const productEnable = async id => {
  try {
    const product = await Product.findById(id);

    product.isDisabled = false;
    await product.save();
    return true;
  } catch (error) {
    console.log("Error enabling product: ", error);
    return false;
  }
};

// Function to update product
const productUpdate = async (_id, product) => {
  try {
    console.log(product,'ddddddddddddddddddddddddddddddddddddddd');
    const product = await Product.updateOne({ _id }, {$set: {}} );

    product.isDisabled = true;
    await product.save();
    return true;
  } catch (error) {
    console.log("Error disabling product: ", error);
    return false;
  }
};





module.exports = {
  addProduct,
  productDisable,
  productEnable,
  getAllProducts,
  getProduct,
  productUpdate
}