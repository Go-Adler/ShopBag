const { User } = require("../../models/userModel");
const Product = require("../../models/adminModel/productsModel");
const db = require("../../config/mongoose");

db();

// Funtion to add / remove product to wishlist 
const updateWishList = async (_id) => {
  try {
    await User.updateOne({ email }, { $set: { password }});
    return true
  } catch (error) {
    throw new Error(`Error changing password: ${error.message}`);
  }
};

module.exports = { updateWishList }