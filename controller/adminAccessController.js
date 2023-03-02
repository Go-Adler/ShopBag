const verify = require('../services/UserServices/getData')
const passwordHelper = require("../helper/passwordHelper")

const signInLoad = (req, res) => {
  console.log(req.session, 'before sign in admin');
  if(req.session.adminId) {
    res.redirect("profile")
  } else {
    res.render("admin/adminSignIn")
  }
}

const signInValidate = async (req, res) => {
  try {
    if (req.session.adminId) {
      res.redirect("admin/home")
    }

    const { email, password } = req.body
    const userData = await verify.getUserData(email);

    if (!userData) {
      throw new Error(
        "We think you are not an admin? You wanna apply for this role?"
      );
    }

    if (!userData.isAdmin) {
      throw new Error("This email id is registered as user");
    }

    const passwordMatch = await passwordHelper.comparePassword(password, email)

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const name = await verify.getName(email)
    req.session.adminId = userData._id;
    req.session.name = name
    res.redirect("home")
  } catch (err) {
    res.render("admin/adminSignIn", { message: err.message });
  }
}

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session");
    } else {
      console.log("Session destroyed successfully");
    }
  })
  res.redirect("signin")
}

module.exports = {
  signInLoad,
  signInValidate,
  logout
}