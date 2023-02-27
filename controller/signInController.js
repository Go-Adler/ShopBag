const verify = require("../helper/userHelper/verifyData");
const insert = require("../helper/userHelper/insertData");

const userSignInLoad = (req, res) => {
  res.render("./user/userSignIn");
};

const userSignUpLoad = (req, res) => {
  res.render("./user/userSignUp");
};

const userSignInValidate = async (req, res) => {
  try {
    const userData = await verify.userData(req.body.email);

    if (!userData) {
      throw new Error(
        "This email id is new to us, wanna sign up?"
      );
    }

    if (userData.is_admin) {
      throw new Error("This email id is registered as admin");
    }

    if (userData.password !== req.body.password) {
      throw new Error("Invalid password");
    }

    res.render("user/home", {userName: userData.name});
  } catch (err) {
    res.render("user/userSignIn", { message: err.message });
  }
};

const userSignUpValidate = async (req, res) => {
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

const home = (req, res) => {
  console.log('ffffffffffffffffffffffffff');
  console.log(req.body);
  console.log('ffffffffffffffffffffffffff');
  userData = verify.userData(req.body.email)
  res.render("./user/home", {userName: userData.name});
};

const start = (req, res) => {
  res.render("./user/start")
}

module.exports = {
  userSignInLoad,
  userSignUpLoad,
  userSignInValidate,
  userSignUpValidate,
  home,
  start
};
