const verify = require("../helper/userHelper/verifyData");
const productsServices = require("../services/AdminServices/productsServices")

const home = async (req, res) => {
  if (req.session && req.session.email) {
    try {
      const products = await productsServices.data()
      const userData = await verify.userData(req.session.email);
      res.render("user/home", { userName: userData.name, products: products });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("signin");
  }
};

const profile = async (req, res) => {
  if (req.session && req.session.email) {
    try {
      const userData = await verify.userData(req.session.email);
      res.render("user/profile", { userName: userData.name });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("signin");
  }
};

const product = async (req, res) => {
  if (req.session && req.session.email) {
    try {
      const product = await productsServices.product(req.params.any)
      const userData = await verify.userData(req.session.email);
      res.render("user/product", { userName: userData.name, product: product});
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("signin");
  }
};

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
  home,
  profile,
  logout,
  product
};