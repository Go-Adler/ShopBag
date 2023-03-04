const { destroySession } = require("../middlewares/commonMiddlewares")
const { getNameWithId } = require("../services/UserServices/dataServices")
const { getAllProducts } = require("../services/AdminServices/productsServices");

// Render sign-in page for user
const renderSignInPage = (req, res) => {
  try {
    // Render sign-in page
    res.render("user/userSignIn")
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering sign-in page of user: ${error.message}`)
  }
};

// Render sign-up page for user
const renderSignUpPage = (req, res) => {
  try {
    // Render sign-up page
    res.render("user/userSignUp");
  } catch (error) {
    // Return error message, page create later
    console.error(error);
    res.status(500).send(`Error rendering sign-up page of user: ${error.message}`)
  }
};

// Render OTP verification page
const renderOTPVerificationPage = (req, res) => {
  try {
    res.render("user/OTPVerification");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering otp verification page: ${error.message}`)
  }
};

// Render OTP verified page
const renderOTPVerifiedPage = (req, res) => {
  try {
    const name = req.session.name
    destroySession()
    res.render("user/OTPVerified", { name });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering otp verified page: ${error.message}`)
  }
};

// Render user home page
const renderHomePage = async (req, res) => {
  try {
      const { _id } = req.session
      const userName = await getNameWithId(_id)
      const products = await getAllProducts();
      res.render("user/home", { userName, products });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering home page: ${error.message}`);
  }
};

// Render profile page
const renderProfilePage = async (req, res) => {
    try {
      const { _id } = req.session
      const userName = await getNameWithId(_id);
      res.render("user/profile", { userName });
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error rendering profile page: ${error.message}`);
    }
};

// const product = async (req, res) => {
//   if (req.session.userId) {
//     try {
//       const product = await productsServices.product(req.params.any);
//       const userData = await getData.getUserData(req.session.email);
//       res.render("user/product", { userName: userData.name, product: product });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal server error");
//     }
//   } else {
//     res.redirect("signin");
//   }
// };

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    } else {
      console.log("Session destroyed successfully.");
    }
  });
  res.redirect("signin");
};

module.exports = {
  renderSignInPage,
  renderSignUpPage,
  renderOTPVerificationPage,
  renderOTPVerifiedPage,
  renderHomePage,
  renderProfilePage,
  logout
};
