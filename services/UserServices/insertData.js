const passwordHelper = require("../../helper/passwordHelper")
const model = require("../../models/userModel");
const db = require("../../config/mongoose");


db();

const STATUS_ADMIN = false
const STATUS_BLOCKED = false

const createUser = async (data) => {
  try {
    const { name, email, gender, phone, password } = data
    const hashedPassword = await passwordHelper.hashPassword(password)

    await model.user.create({
      name,
      email,
      gender,
      phone,
      password: hashedPassword,
      isAdmin: STATUS_ADMIN,
      isBlocked: STATUS_BLOCKED
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
