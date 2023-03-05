const { User } = require("../../models/userModel");
const db = require("../../config/mongoose");

db();

// Function to check if a user existing with the given email
const checkUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return Boolean(user);
  } catch (error) {
    throw new Error(`Error checking user existance with email: ${error.message}`);
  }
};

// Function to check if a user existing with the given phone
const checkUserByPhone = async (phone) => {
  try {
    const user = await User.findOne({ phone });
    return Boolean(user);
  } catch (error) {
    throw new Error(`Error checking user existance with phone: ${error.message}`);
  }
};

// Function to get user data with email
const getUserDataWithEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user || false;
  } catch (error) {
    throw new Error(`Error getting user data with email: ${error.message}`);
  }
};

// Get password with email
const getPasswordWithEmail = async (email) => {
  try {
    const userData = await getUserDataWithEmail(email);
    return userData?.password || false;
  } catch (error) {
    throw new Error(`Error getting password with email: ${error.message}`);
  }
};

const getName = async (email) => {
  try {
    const userData = await getUserData(email);
    return userData?.name || false;
  } catch (error) {
    throw new Error(`Error getting user name with email: ${error.message}`);
  }
};

// Get user name using id
const getNameWithId = async (_id) => {
  try {
    const userData = await User.findOne({ _id });
    return userData?.name || false;
  } catch (error) {
    throw new Error(`Error getting user name with id: ${error.message}`);
  }
};

// Function to get all users data or single user data
const getUsersData = async (_id) => {
  try {
    const query = _id ? { _id } : {};
    const user = await User.find(query);
    return user || false;
  } catch (error) {
    throw new Error(`Error getting user data with / without id: ${error.message}`);
  }
};

module.exports = {
  checkUserByEmail,
  checkUserByPhone,
  getUserDataWithEmail,
  getPasswordWithEmail,
  getName,
  getNameWithId,
  getUsersData,
};
