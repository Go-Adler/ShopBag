const model = require("../../models/userModel");
const db = require("../../config/mongoose");

db();

const something = () => {
  console.log("Reached email");
};

const email = async (email) => {
  const userData = await model.user.findOne({ email: email });
  return userData ? true : false;
};

const phone = async (phone) => {
  const userData = await model.user.findOne({ phone: phone });
  return userData ? true : false;
};

const userData = async (email) => {
  const userData = await model.user.findOne({ email: email });
  return userData ? userData : false;
};

module.exports = {
  email,
  phone,
  userData,
};
