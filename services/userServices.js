const User = require("../models/userModel");
const db = require("../config/mongoose");

db();

const findUser = async (id) => {
  try {
    const userData = await User.user.findOne({ _id: id });
    return userData;
  } catch (error) {
    console.log("Error finding user data from database: ", error);
    return false;
  }
};

const blockUser = async (id) => {
  try {
    const userData = await findUser(id);

    if (!userData) {
      throw new Error("User not found");
    }

    userData.isBlocked = true;
    await userData.save();
    return true;
  } catch (error) {
    console.log("Error blocking user: ", error);
    return false;
  }
};

const unblockUser = async (id) => {
  try {
    const userData = await findUser(id);

    if (!userData) {
      throw new Error("User not found");
    }

    userData.isBlocked = false;
    await userData.save();
    return true;
  } catch (error) {
    console.log("Error unblocking user: ", error);
    return false;
  }
};

module.exports = {
  findUser,
  blockUser,
  unblockUser
};
