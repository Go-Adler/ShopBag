import { User } from "../../models/userModel"
import { Product } from "../../models/adminModel/productsModel"
import { mongo } from "../config/mongoose"

mongo();

// Function to check if a user existing with the given email
export const checkUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return Boolean(user);
  } catch (error) {
    throw new Error(`Error checking user existance with email: ${error.message}`);
  }
};

// Function to check if a user existing with the given phone
export const checkUserByPhone = async (phone) => {
  try {
    const user = await User.findOne({ phone });
    return Boolean(user);
  } catch (error) {
    throw new Error(`Error checking user existance with phone: ${error.message}`);
  }
};

// Function to get user data with email
export const getUserDataWithEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user || false;
  } catch (error) {
    throw new Error(`Error getting user data with email: ${error.message}`);
  }
};

// Get password with email
export const getPasswordWithEmail = async (email) => {
  try {
    const userData = await getUserDataWithEmail(email);
    return userData?.password || false;
  } catch (error) {
    throw new Error(`Error getting password with email: ${error.message}`);
  }
};

// Get product with id
export const getProductWithId = async _id => {
  try {
    const productData = await Product.findOne({ _id }).populate('productCategory').populate('productSubcategory')

    return productData ? productData : false
  } catch (error) {
    throw new Error(`Error getting password with email: ${error.message}`);
  }
};

// Get user name
export const getName = async (email) => {
  try {
    const userData = await getUserData(email);
    return userData?.name || false;
  } catch (error) {
    throw new Error(`Error getting user name with email: ${error.message}`);
  }
};

// Get user name using id
export const getNameWithId = async (_id) => {
  try {
    const userData = await User.findOne({ _id });
    return userData?.name || false;
  } catch (error) {
    throw new Error(`Error getting user name with id: ${error.message}`);
  }
};

// Function to get all users data or single user data
export const getUsersData = async (_id) => {
  try {
    const query = _id ? { _id } : {};
    const user = await User.find(query);
    return user || false;
  } catch (error) {
    throw new Error(`Error getting user data with / without id: ${error.message}`);
  }
};

// Function to check user status
export const checkUserStatus = async _id => {
  try {
    const status = await User.findOne({_id}, {isBlocked: 1, _id:0});
    return Boolean(status.isBlocked);
  } catch (error) {
    throw new Error(`Error checking user existance with phone: ${error.message}`);
  }
};

// Change user password with email
export const changePassword = async (email, password) => {
  try {
    await User.updateOne({ email }, { $set: { password }});
    return true
  } catch (error) {
    throw new Error(`Error changing password: ${error.message}`);
  }
};