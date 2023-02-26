const verify = require("../helper/userHelper/verifyData");
const insert = require("../helper/userHelper/insertData");

const userSignInLoad = (req, res) => {
  res.render("./user/userSignIn");
};

const userSignUpLoad = (req, res) => {
  res.render("./user/userSignUp");
};

const userSignInValidate = async (req, res) => {
   const userData = await  verify.admin(req.body.email) 
   if (userData) {
    console.log('This is admin acc');
   } else {
    console.log('This is not admin');
   }
};

const userSignUpValidate = async (req, res) => {
  const verifyEmail = await verify.email(req.body.email);
  const verifyPhone = await verify.phone(req.body.phone);

  if (verifyEmail && verifyPhone) {
    res.render("user/userSignUp", {
      message: `Both the email ${req.body.email} and the phone number ${req.body.phone} already exist.`,
      success: false,
    });
  } else if (verifyEmail) {
    res.render("user/userSignUp", {
      message: `The email ${req.body.email} already exist.`,
      success: false,
    });
  } else if (verifyPhone) {
    res.render("user/userSignUp", {
      message: `The phone number ${req.body.phone} already exist.`,
      success: false,
    });
  } else {
    const userData = await insert.user(req.body);
    if (userData) {
      res.render("user/userSignUp", {
        username: req.body.name,
        title: "Login page",
        success: true,
      });
    }
  }
  const insertUser = await insert.user(req.body);
};

const home = (req, res) => {
  res.render("./user/start");
};

module.exports = {
  userSignInLoad,
  userSignUpLoad,
  userSignInValidate,
  userSignUpValidate,
  home,
};
