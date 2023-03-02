const getData = require("../services/UserServices/getData")

const userLoad = async (req, res) => {
  try {
    if (req.session.adminId) {
      const usersData = getData.getUsersData()
      const userName = getData.getNameWithId(req.session.userId)
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
    if (req.session.userId) {
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

const homeLoad = async (req, res) => {
  console.log(req.session.adminId, req.session.userId, 'this gonna work still');
  try {
    if (req.session.adminId) {
    res.render("admin/home", { userName: req.session.name });
    } else {
      res.redirect("signin");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

const profileLoad = async (req, res) => {
  try {
    if (req.session.adminId) {
      res.render("admin/profile", { userName: req.session.name });
    } else {
      res.redirect("signin");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};


module.exports = {
  userLoad,
  homeLoad,
  profileLoad,
  categoryLoad
};
