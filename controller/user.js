const productsServices = require("../services/AdminServices/productsServices");
const verify = require("../services/UserServices/getData");

const home = async (req, res) => {
  try {
    if (req.session && req.session.email) {
      const { email } = req.session.email;
      const products = await productsServices.data();
      const userData = await verify.getUserData(email);
      res.render("user/home", { userName: userData.name, products: products });
    } else {
      res.redirect("signin");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const profile = async (req, res) => {
  if (req.session && req.session.email) {
    try {
      const userData = await verify.getUserData(req.session.email);
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
      const product = await productsServices.product(req.params.any);
      const userData = await verify.getUserData(req.session.email);
      res.render("user/product", { userName: userData.name, product: product });
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
  product,
};
