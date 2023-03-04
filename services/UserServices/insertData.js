const { hashPassword } = require("../../helper/passwordHelper")
const { User } = require("../../models/userModel");
const db = require("../../config/mongoose");

db();

// Insert new user data into database
const createUser = async (data) => {
  try {
    const { name, email, gender, phone, password } = data
    const hashedPassword = await hashPassword(password)

    await User.create({
      name,
      email,
      gender,
      phone,
      password: hashedPassword
    });
    console.log('coming in create user');
    return true
  } catch (error) {
    console.log('Error creating new user: ', error.message);
    return false 
  }
};

module.exports = {
  createUser
};
