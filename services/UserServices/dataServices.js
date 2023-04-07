import { User } from "../../models/userModel.js"
import { Product } from "../../models/adminModel/productsModel.js"
import { mongo } from "../../config/mongoose.js"

mongo();

// Function to check if a user existing with the given email
export const checkUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return Boolean(user);
  } catch (error) {
    console.error(`Error in check user by email: ${error.message}`)
    throw new Error(`Error in check user by email: ${error}`)
  }
};

// Function to check if a user existing with the given phone
export const checkUserByPhone = async (phone) => {
  try {
    const user = await User.findOne({ phone });
    return Boolean(user);
  } catch (error) {
    console.error(`Error in check user by phone: ${error.message}`)
    throw new Error(`Error in check uyser by phone: ${error}`)
  }
};

// Function to get user data with email
export const getUserDataWithEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user || false;
  } catch (error) {
    console.error(`Error in get user data with email: ${error.message}`)
    throw new Error(`Error in get user data with email: ${error}`)
  }
};

// Get password with email
export const getPasswordWithEmail = async (email) => {
  try {
    const userData = await getUserDataWithEmail(email);
    return userData?.password || false;
  } catch (error) {
    console.error(`Error in get password with email: ${error.message}`)
    throw new Error(`Error in get password with email: ${error}`)
  }
};

// Get product with id
export const getProductWithId = async _id => {
  try {
    const productData = await Product.findOne({ _id }).populate('productCategory').populate('productSubcategory')

    return productData ? productData : false
  } catch (error) {
    console.error(`Error in get product with id: ${error.message}`)
    throw new Error(`Error in get product with id: ${error}`)
  }
};

// Get user name
export const getName = async (email) => {
  try {
    const userData = await getUserData(email);
    return userData?.name || false;
  } catch (error) {
    console.error(`Error in get name with email: ${error.message}`)
    throw new Error(`Error in get name with email: ${error}`)
  }
};

// Get user name using id
export const getNameWithId = async (_id) => {
  try {
    const userData = await User.findOne({ _id });
    return userData?.name || false;
  } catch (error) {
    console.error(`Error in get name with id: ${error.message}`)
    throw new Error(`Error in get name with id: ${error}`)
  }
};

// Function to get all users data or single user data
export const getUsersData = async (_id) => {
  try {
    const query = _id ? { _id } : {};
    const user = await User.find(query);
    return user || false;
  } catch (error) {
    console.error(`Error in get user data: ${error.message}`)
    throw new Error(`Error in get user data: ${error}`)
  }
};

// Function to check user status
export const checkUserStatus = async _id => {
  try {
    const status = await User.findOne({_id}, {isBlocked: 1, _id:0});
    return Boolean(status.isBlocked);
  } catch (error) {
    console.error(`Error in check user status: ${error.message}`)
    throw new Error(`Error in check user status: ${error}`)
  }
};

// Change user password with email
export const changePassword = async (email, password) => {
  try {
    await User.updateOne({ email }, { $set: { password }});
    return true
  } catch (error) {
    console.error(`Error in change password: ${error.message}`)
    throw new Error(`Error in change password: ${error}`)
  }
};