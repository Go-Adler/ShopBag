const verify = require("../helper/userHelper/verifyData");
const insert = require("../helper/userHelper/insertData");

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
  try {
    const userData = await verify.userData(req.body.email);

    if (!userData) {
      throw new Error("This email id is new to us, wanna sign up?");
    }

    if (userData.isAdmin) {
      throw new Error("This email id is registered as admin");
    }

    if (userData.isBlocked) {
      throw new Error("Sorry the user is blocked");
    }

    if (userData.password !== req.body.password) {
      throw new Error("Invalid password");
    }
    
    req.session.email = userData.email;
    res.redirect("home");
  } catch (err) {
    res.render("user/userSignIn", { message: err.message });
  }
};

const userSignUpValidate = async (req, res) => {
  console.log(req.body, 'cccccccccccccccccccc');
  try {
    const verifyEmail = await verify.email(req.body.email);
    const verifyPhone = await verify.phone(req.body.phone);
    
    if (verifyEmail && verifyPhone) {
      throw new Error(
        `Both the email ${req.body.email} and the phone number ${req.body.phone} already exist.`
      );
    } else if (verifyEmail) {
      throw new Error(`The email ${req.body.email} already exist.`);
    } else if (verifyPhone) {
      throw new Error(`The phone number ${req.body.phone} already exist.`);
    } else {
      const userData = await insert.user(req.body);
      if (userData) {
        res.render("user/userSignUp", {
          username: req.body.name,
          title: "Sign up page",
          success: true,
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
