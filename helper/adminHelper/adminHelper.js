const model = require("../../models/userModel");
const db = require("../../config/mongoose")

db()

const userData = async () => {
  const userData = await model.user.find();
  return userData ? userData : false;
};

module.exports = {
  userData
}