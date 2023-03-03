const User = require("../../models/userModel");
const db = require("../../config/mongoose");

db();

const checkEmail = async email => {
  try {
    const user = await User.findOne({ email });
    return Boolean(user);
  } catch (error) {
    throw new Error(`Error checking user existance with email: ${error.message}`)
  }
};

const checkPhone = async phone => {
  try {
    const user = await User.findOne({ phone });
    return Boolean(user);
  } catch (error) {
    throw new Error(`Error checking user existance with phone: ${error.message}`)
  }
};

const getUserData = async email => {
  try {
    const user = await User.findOne({ email });
    return user || false;
  } catch (error) {
    throw new Error(`Error getting user data with email: ${error.message}`)
  }
};

const getPassword = async email => {
  try {
    const userData = await getUserData(email)
    return userData?.password || false
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting password with email: ${error.message}`)
  }
}

const getName = async email => {
  try {
    const userData = await getUserData(email)
    return userData?.name || false
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting user name with email: ${error.message}`)
  }
}

const getNameWithId = async _id => {
  try {
    const userData = await userModel.user.findOne({ _id })
    return userData?.name || false
  } catch (error) {
    throw new Error(`Error getting user name with id: ${error.message}`)
  }
}

const getUserDataWithId = async _id => {
  try {
    const userData = await userModel.user.findOne({ _id })
    return userData || false
  } catch (error) {
    console.error(error);
    return false
  }
}

const getUsersData = async _id => {
  try {
    const usersData = await userModel.user.find()
    return usersData || false
  } catch (error) {
    console.error(error);
    return false
  }
}

module.exports = {
  checkEmail,
  checkPhone,
  getUserData,
  getPassword,
  getName,
  getNameWithId,
  getUserDataWithId,
  getUsersData
};
