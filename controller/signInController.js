// const insert = require("../services/UserServices/insertData");
const verify = require("../services/UserServices/getData");
const passwordHelper = require("../helper/passwordHelper");
const otpService = require("../services/UserServices/userAccessServices")
const randomNumber = require("../helper/userHelper/randomNumber");


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

const OTPVerificationLoad = (req, res) => {
  if (req.session && req.session.email)  {
    res.redirect("home")
  } else {
    res.render("./user/OTPVerification");
  }
};

const OTPVerification = (req, res) => {
  if (req.session && req.session.email)  {
    res.redirect("home")
  } else {
    console.log(req.body, 'cccccccccccccc');
    res.render("./user/OTPVerification");
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
    }
    
    if (verifyEmail) {
      throw new Error(`The email ${email} already exist.`);
    }
    
    if (verifyPhone) {
      throw new Error(`The phone number ${phone} already exist.`);
    }

    const rNumber = randomNumber()
    const otp = await otpService(email, rNumber)

    if (!otp) {
      throw new Error ("Error sending OTP")
    }

    res.redirect("OTPVerification")

    // const userData = await insert.createUser(req.body);

    // if (userData) {
    //   res.render("user/userSignUp", {
    //     username: name,
    //     title: "Sign up page",
    //     success: true
    //   });
    // }

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
  OTPVerificationLoad,
  OTPVerification,
  userSignInValidate,
  userSignUpValidate,
  start,
};
