const { destroySession } = require("../middlewares/commonMiddlewares")
const { getAllCategories, getAllProductsPaginated } = require("../services/AdminServices/productsServices");
const { getWishlistedIDs } = require("../services/UserServices/productServices")

// Render sign-in page for user
const renderSignInPage = (req, res) => {
  try {
    // Render sign-in page
    res.render("user/userSignIn", { title: 'User Sign In'})
  } catch (error) {
    console.error(`Error rendering sign in page of user: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render sign-up page for user
const renderSignUpPage = (req, res) => {
  try {
    // Render sign-up page
    res.render("user/userSignUp", { title: 'User Sign Up'});
  } catch (error) {
    console.error(`Error rendering sign up page of user: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render OTP verification page
const renderOTPVerificationPage = (req, res) => {
  try {
    res.render("user/OTPVerification", { title: 'OTP verification'});
  } catch (error) {
    console.error(`Error rendering otp verification page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render OTP verified page
const renderOTPVerifiedPage = (req, res) => {
  try {
    const { name } = req.session
    destroySession()
    res.render("user/OTPVerified", { name, message: 'Your otp is verifed, now you can log in', title: 'OTP verified' });
  } catch (error) {
    console.error(`Error rendering otp verified page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render user home page
const renderHomePage = async (req, res) => {
  try {
      console.log('comes home');
      const { name, _id } = req.session
      const page = req.body.page || 1
      const { fetch } = req.body
      const wishlist = await getWishlistedIDs(_id)
      const products = await getAllProductsPaginated(page);
      const categories = await getAllCategories()
      if (fetch) {
    
        return res.json({products, wishlist})
      } else {
        return res.render("user/home", { name, products, title: 'Home Page User', wishlist, categories });
      }
  } catch (error) {
    console.error(`Error rendering home page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render profile page
const renderProfilePage = async (req, res) => {
    try {
      const { name } = req.session
      res.render("user/profile", { name, title: 'Profile Page User' });
    } catch (error) {
      console.error(`Error rendering profile page: ${error.message}`);
      res.render("error", { message: error.message, previousPage: req.headers.referer})
    }
};

// Render forgot password page
const renderForgotPassword = (req, res) => {
  try {
    res.render("user/forgotPassword", { title: 'Forgot Password' })
  } catch (error) {
    console.error(`Error rendering forgot password: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render otp verification for forgot password
const renderOTPVerificationPageForgotPassword = (req, res) => {
  try {
    res.render("user/OTPVerificationForgotPassword", { title: 'OTP Verification forgot password'});
  } catch (error) {
    console.error(`Error rendering otp verification page forgot password: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render change password page before sign in
const renderChangePassword = (req, res) => {
  try {
    res.render("user/changePassword", { title: 'Change Password'});
  } catch (error) {
    console.error(`Error rendering change password: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

module.exports = {
  renderSignInPage,
  renderSignUpPage,
  renderOTPVerificationPage,
  renderOTPVerifiedPage,
  renderHomePage,
  renderProfilePage,
  renderForgotPassword,
  renderOTPVerificationPageForgotPassword,
  renderChangePassword
};
