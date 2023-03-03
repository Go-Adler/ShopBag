const { getNameWithId } = require("../services/UserServices/dataServices")
const adminServices = require("../services/adminServices")

// Render sign-in page for admin
const renderSignInPage = (req, res) => {
  try {
    // Render sign-in page
    res.render("admin/adminSignIn")
  } catch (error) {
    console.error(error);
    // Return error message, page create later
    res.status(500).send(`Error rendering sign-in page of admin: ${error.message}`)
  }
}

// Render home page for admin
const renderHomePage = async (req, res) => {
  try {
    // Validating input parameters
    if (!req.session || !req.session._id) {
      throw new Error("Invalid session data");
    }

    const { _id } = req.session

    //Get user name from database using id
    const userName = await getNameWithId(_id)

    //Render home page with user name
    res.render("admin/home", { userName });
  } catch (error) {
    console.error(error);
    
    //Returning error, page should be made later
    res.status(500).send(`Error rendering home page: ${error.message}`);
  }
}

// Render profile page for admin
const renderUserProfilePage = async (req, res) => {
  try {
    // Validating input parameters
    if(!req.session || !req.session._id) {
      throw new Error("Invalid session data");
    }
    
    const { _id } = req.session

    // Get user name using from database using id
    const userName = await getNameWithId(_id)

    // Render profile page with user name
    res.render("admin/profile", { userName });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error rendering profile page: ${error.message}`);
  }
};

const userLoad = async (req, res) => {
  try {
    if (req.session.adminId) {
      const usersData = await getData.getUsersData()
      const userName = await getData.getNameWithId(req.session.userId)
      res.render("admin/users", { userName, usersData });
    } else {
      res.redirect("signin");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const categoryLoad = async (req, res) => {
  try {
    if (req.session.adminId) {
      const category = await adminServices.categoryData();
      const subCategory = await adminServices.subCategoryData();
      res.render("admin/category", {
        userName: req.session.name,
        category,
        subCategory,
      });
    } else {
      res.redirect("signin");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};






module.exports = {
  renderSignInPage,
  renderHomePage,
  renderUserProfilePage,

  userLoad,
  profileLoad,
  categoryLoad
};
