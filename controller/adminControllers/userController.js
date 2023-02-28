const User = require("../../models/userModel");
const db = require("../../config/mongoose")

db()

exports.block = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }
    user.isBlocked = true;
    await user.save();
    res.redirect("/users"); // redirect to the users page
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.unBlock = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }
    user.blocked = false;
    await user.save();
    res.redirect("/users"); // redirect to the users page
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
