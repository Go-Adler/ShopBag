const verify = require("../helper/userHelper/verifyData");
const adminHelper = require("../helper/adminHelper/adminHelper")

const userLoad = async (req, res) => {
  if (req.session && req.session.adminEmail) {
    try {
      const userData = await verify.userData(req.session.adminEmail);
      const usersData = await adminHelper.userData()
      res.render("admin/users", { userName: userData.name, usersData });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("signin");
  }
};

const homeLoad = async (req, res) => {
  if (req.session && req.session.adminEmail) {
    try {
      const userData = await verify.userData(req.session.adminEmail);
      console.log(userData);
      res.render("admin/home", { userName: userData.name });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("signin");
  }
};

const profile = async (req, res) => {
  if (req.session && req.session.adminEmail) {
    try {
      const userData = await verify.userData(req.session.adminEmail);
      console.log(userData);
      res.render("admin/profile", { userName: userData.name });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("signin");
  }
};

module.exports = {
  userLoad,
  homeLoad,
  profile
};
