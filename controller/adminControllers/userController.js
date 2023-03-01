const User = require("../../models/userModel");
const db = require("../../config/mongoose")

db()

const block = async (req, res) => {
  try {
    const user = await User.user.findOne({ _id: req.body.userId });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }
    user.isBlocked = true;
    await user.save();
    res.status(200).send()
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const unBlock = async (req, res) => {
  try {
    const user = await User.user.findOne({ _id: req.body.userId });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }
    user.isBlocked = false;
    await user.save();
    res.status(200).send() 
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  block,
  unBlock
}