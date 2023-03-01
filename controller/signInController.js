const insert = require("../services/UserServices/insertData");
const verify = require("../services/UserServices/getData");
const passwordHelper = require("../helper/passwordHelper");

const userSignInLoad = (req, res) => {
  if (req.session && req.session.email) {
    res.redirect("profile");
  } else {
    res.render("user/userSignIn");
  }
};

const userSignUpLoad = (req, res) => {

  if (req.session && req.session.email)  {
    res.redirect("home")
  } else {
    res.render("./user/userSignUp");
  }

};

const userSignInValidate = async (req, res) => {
  const { email, password }  = req.body

  try {
    const userData = await verify.getUserData(email);

    if (!userData) {
      throw new Error("This email id is new to us, wanna sign up?");
    }

    if (userData.isAdmin) {
      throw new Error("This email id is registered as admin");
    }

    if (userData.isBlocked) {
      throw new Error("Sorry the user is blocked");
    }

    const passwordMatch = await passwordHelper.comparePassword(password, email)

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    
    req.session.email = email;
    res.redirect("home");
  } catch (err) {
    res.render("user/userSignIn", { message: err.message });
  }
};

const userSignUpValidate = async (req, res) => {
  const { phone, email, name } = req.body;

  try {
    const verifyEmail = await verify.checkEmail(email);
    const verifyPhone = await verify.checkPhone(phone);
    
    if (verifyEmail && verifyPhone) {
      throw new Error(
        `Both the email ${email} and the phone number ${phone} already exist.`
      );
    } else if (verifyEmail) {
      throw new Error(`The email ${email} already exist.`);
    } else if (verifyPhone) {
      throw new Error(`The phone number ${phone} already exist.`);
    } else {
      const userData = await insert.createUser(req.body);
      if (userData) {
        res.render("user/userSignUp", {
          username: name,
          title: "Sign up page",
          success: true
        });
      }
    }
  } catch (err) {
    res.render("user/userSignUp", {
      message: err.message,
      success: false,
    });
  }
};

const start = (req, res) => {
  res.render("./user/start");
};

module.exports = {
  userSignInLoad,
  userSignUpLoad,
  userSignInValidate,
  userSignUpValidate,
  start,
};
