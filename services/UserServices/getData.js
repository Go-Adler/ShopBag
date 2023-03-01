const userModel = require("../../models/userModel");
const db = require("../../config/mongoose");

db();

const checkEmail = async email => {
  try {
    const user = await userModel.user.findOne({ email });
    return Boolean(user);
  } catch (error) {
    console.error(error);
  }
};

const checkPhone = async phone => {
  try {
    const user = await userModel.user.findOne({ phone });
    return Boolean(user);
  } catch (error) {
    console.error(error);
    return false
  }
};

const getUserData = async email => {
  try {
    const user = await userModel.user.findOne({ email });
    return user || false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getPassword = async email => {
  try {
    const userData = await getUserData(email)
    return userData.password || false
  } catch (error) {
    console.error(error);
    return false
  }
}

const getName = async email => {
  try {
    const userData = await getUserData(email)
    return userData.name || false
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
  getName
};
