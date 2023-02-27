const verify = require('../helper/userHelper/verifyData')

const signInLoad = (req, res) => {
  res.render("admin/adminSignIn")
}

const signInValidate = async (req, res) => {
  try {
    const userData = await verify.userData(req.body.email);

    if (!userData) {
      throw new Error(
        "We think you are not an admin? You wanna apply for this role?"
      );
    }

    if (!userData.is_admin) {
      throw new Error("This email id is registered as user");
    }

    if (userData.password !== req.body.password) {
      throw new Error("Invalid password");
    }

    res.render("admin/home", {userName: userData.name});
  } catch (err) {
    res.render("admin/adminSignIn", { message: err.message });
  }
}

module.exports = {
  signInLoad,
  signInValidate
}