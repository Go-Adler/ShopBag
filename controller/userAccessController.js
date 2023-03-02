const verify = require("../services/UserServices/getData");
const passwordHelper = require("../helper/passwordHelper");
const otpService = require("../services/UserServices/userAccessServices");
const randomNumber = require("../helper/userHelper/randomNumber");
const insert = require("../services/UserServices/insertData");

const userSignInLoad = (req, res) => {
  if (req.session.userId) {
    res.redirect("profile");
  } else {
    res.render("user/userSignIn");
  }
};

const userSignUpLoad = (req, res) => {
  if (req.session.userId) {
    res.redirect("home");
  } else {
    res.render("user/userSignUp");
  }
};

const OTPVerificationLoad = (req, res) => {
  if (req.session.userId) {
    res.redirect("home");
  } else {
    res.render("user/OTPVerification");
  }
};

const OTPVerifiedLoad = (req, res) => {
  const userId = req.session.userId
  const name = req.session.name

  if (userId) {
    res.redirect("home");
  } else {
    req.session.destroy((error) => {
      if (error) {
        throw new Error("Error destroying session:", error);
      } else {
        console.log("Session destroyed successfully.");
      }
    });

    res.render("user/OTPVerified", { name });
  }

};

const OTPVerification = async (req, res) => {
  try {
    const { userId, otp } = req.session;
    const { otpEntered } = req.body;

    if (userId) {
      return res.redirect("home");
    }

    if (otp == otpEntered) {
      const userData = req.session.userData;
      await insert.createUser(userData);
      const userName = userData.name
      
      req.session.name = userName
      res.redirect("otpVerified");
    }

    res.render("user/OTPVerification", {
      message: "Invalid OTP. Please try again.",
    });
  } catch (error) {
    console.log(`Error verifying OTP: ${error.message}`);
    return res.render("user/OTPVerification", {
      message: "Error verifying OTP. Please try again.",
    });
  }
};

const userSignInValidate = async (req, res) => {
  try {
    if (req.session.userId) {
      res.render("home");
    }

    const { email, password } = req.body;
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

    const passwordMatch = await passwordHelper.comparePassword(password, email);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    req.session.userId = userData._id;
    res.redirect("home");
  } catch (err) {
    res.render("user/userSignIn", { message: err.message });
  }
};

const userSignUpValidate = async (req, res) => {
  try {
    if (req.session.userId) {
      res.render("home");
    }

    const { phone, email } = req.body;
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

    const rNumber = randomNumber();
    const otp = await otpService(email, rNumber);

    if (!otp) {
      throw new Error("Error sending OTP");
    }

    req.session.userData = req.body;
    req.session.otp = rNumber;
    res.redirect("OTPVerification");
  } catch (err) {
    res.render("user/userSignUp", {
      message: err.message,
      success: false,
    });
  }
};

const start = (req, res) => {
  res.render("user/start");
};

module.exports = {
  userSignInLoad,
  userSignUpLoad,
  OTPVerificationLoad,
  OTPVerification,
  userSignInValidate,
  userSignUpValidate,
  start,
  OTPVerifiedLoad
};
