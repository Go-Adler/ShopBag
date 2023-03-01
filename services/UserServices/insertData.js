const passwordHelper = require("../../helper/passwordHelper")
const model = require("../../models/userModel");
const db = require("../../config/mongoose");


db();

const createUser = async (data) => {
  try {
    const { name, email, gender, phone } = data
    const password = await passwordHelper.hashPassword(data.password)

    await model.user.create({
      name,
      email,
      gender,
      phone,
      password,
      isAdmin: 0,
      isBlocked: 0
    });

    return true
  } catch (error) {
    console.log('Error: ', error.message);
    return false 
  }
};

module.exports = {
  createUser
};
