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
const productUpdate = async (_id, products) => {
  try {
    const { productName, description, price , stock, productCategory, productSubcategory, images, selected_images } = products
    if (images.length && selected_images.length !== 1) {
      console.log('comes many');
      await Promise.all(selected_images.map((element, index) => {
        return Product.updateOne({_id}, { $set: {
          [`images.${element}`]: images[index]
        }});
      }));
    } else if (images.length) {
      console.log('comes one');
      await Product.updateOne({ _id }, { $set: {
        [`images.${selected_images}`]: images[0]
      }})
    }
    await Product.updateOne({ _id }, {$set: {
        productName,
        description,
        price,
        stock,
        productCategory,
        productSubcategory,
    }} );
    
    
    return true;
  } catch (error) {
    console.log("Error updating product: ", error);
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