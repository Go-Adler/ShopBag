const { destroySession } = require("../middlewares/commonMiddlewares")
const { getAllProducts, getAllCategories } = require("../services/AdminServices/productsServices");
const { getWishlistedIDs } = require("../services/UserServices/productServices")

// Render sign-in page for user
const renderSignInPage = (req, res) => {
  try {
    // Render sign-in page
    res.render("user/userSignIn", { title: 'User Sign In'})
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering sign-in page of user: ${error.message}`)
  }
};

// Render sign-up page for user
const renderSignUpPage = (req, res) => {
  try {
    // Render sign-up page
    res.render("user/userSignUp", { title: 'User Sign Up'});
  } catch (error) {
    // Return error message, page create later
    console.error(error);
    res.status(500).send(`Error rendering sign-up page of user: ${error.message}`)
  }
};

// Render OTP verification page
const renderOTPVerificationPage = (req, res) => {
  try {
    res.render("user/OTPVerification", { title: 'OTP verification'});
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering otp verification page: ${error.message}`)
  }
};

// Render OTP verified page
const renderOTPVerifiedPage = (req, res) => {
  try {
    const { name } = req.session
    destroySession()
    res.render("user/OTPVerified", { name, message: 'Your otp is verifed, now you can log in', title: 'OTP verified' });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering otp verified page: ${error.message}`)
  }
};

// Render user home page
const renderHomePage = async (req, res) => {
  try {
      const { name, _id } = req.session
      const wishlist = await getWishlistedIDs(_id)
      const products = await getAllProducts();
      const categories = await getAllCategories()
      return res.render("user/home", { name, products, title: 'Home Page User', wishlist, categories});
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering home page: ${error.message}`);
  }
};

// Render profile page
const renderProfilePage = async (req, res) => {
    try {
      const { name } = req.session
      res.render("user/profile", { name, title: 'Profile Page User' });
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error rendering profile page: ${error.message}`);
    }
};

// Render forgot password page
const renderForgotPassword = (req, res) => {
  try {
    res.render("user/forgotPassword", { title: 'Forgot Password' })
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering forgot password for user: ${error.message}`)
  }
};

// Render otp verification for forgot password
const renderOTPVerificationPageForgotPassword = (req, res) => {
  try {
    res.render("user/OTPVerificationForgotPassword", { title: 'OTP Verification forgot password'});
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering otp verification page for forgot password: ${error.message}`)
  }
};

// Render change password page before sign in
const renderChangePassword = (req, res) => {
  try {
    res.render("user/changePassword", { title: 'Change Password'});
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering change password page: ${error.message}`)
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
