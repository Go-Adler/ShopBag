const { getUsersData } = require("../services/UserServices/dataServices")
const { getCategory, getSubcategory } = require("../services/adminServices")

// Render sign-in page for admin
const renderSignInPage = (req, res) => {
  try {
    // Render sign-in page
    res.render("admin/adminSignIn")
  } catch (error) {
    console.error(error);
    // Return error message, page create later
    res.render("error")
  }
}

// Render home page for admin
const renderHomePage = async (req, res) => {
  try {
    const { name } = req.session

    //Render home page with name
    res.render("admin/home", { name });
  } catch (error) {
    console.error(error);
    
    //Returning error, page should be made later
    res.status(500).send(`Error rendering home page: ${error.message}`);
  }
}

// Render profile page for admin
const renderUserProfilePage = async (req, res) => {
  try {
    const { name } = req.session
    
    // Render profile page with user name
    res.render("admin/profile", { name });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering profile page: ${error.message}`);
  }
};

// Render users list page
const renderUsersListPage = async (req, res) => {
  try {
    const { name } = req.session
    const usersData = await getUsersData()
    res.render("admin/users", { name, usersData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
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
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};






module.exports = {
  renderSignInPage,
  renderHomePage,
  renderUserProfilePage,
  renderUsersListPage,
  renderCategoryControlPage
};
