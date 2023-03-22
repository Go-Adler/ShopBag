const { getUsersData } = require("../services/UserServices/dataServices")
const { getCategory } = require("../services/adminServices")

// Render sign-in page for admin
const renderSignInPage = (req, res) => {
  try {
    // Render sign-in page
    res.render("admin/adminSignIn")
  } catch (error) {
    console.error(`Error rendering sign in page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}

// Render home page for admin
const renderHomePage = async (req, res) => {
  try {
    const { name } = req.session

    //Render home page with name
    res.render("admin/home", { name });
  } catch (error) {
    console.error(`Error rendering home page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}

// Render profile page for admin
const renderUserProfilePage = async (req, res) => {
  try {
    const { name } = req.session
    
    // Render profile page with user name
    res.render("admin/profile", { name });
  } catch (error) {
    console.error(`Error rendering user profile page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render users list page
const renderUsersListPage = async (req, res) => {
  try {
    const { name } = req.session
    const usersData = await getUsersData()
    res.render("admin/users", { name, usersData });
  } catch (error) {
    console.error(`Error rendering users list: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};

// Render category control page
const renderCategoryControlPage = async (req, res) => {
  try {
      const { name } = req.session
      const { message } = req.query

      const category = await getCategory();
      res.render("admin/category", {
        name,
        category,
        message,
        title: "Category"
      });
  } catch (error) {
    console.error(`Error rendering category control page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};






module.exports = {
  renderSignInPage,
  renderHomePage,
  renderUserProfilePage,
  renderUsersListPage,
  renderCategoryControlPage
};
