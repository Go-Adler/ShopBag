const productsServices = require("../services/AdminServices/productsServices");
const getData = require("../services/UserServices/getData");

const home = async (req, res) => {
  console.log(req.session, 'after');
  try {
    if (req.session.userId) {
      const name = await getData.getNameWithId(req.session.userId)
      const products = await productsServices.data();
      res.render("user/home", { userName: name, products: products });
    } else {
      res.redirect("signin");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const profile = async (req, res) => {
  if (req.session.userId) {
    try {
      const name = await getData.getNameWithId(req.session.userId);
      res.render("user/profile", { userName: name });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("signin");
  }
};

const product = async (req, res) => {
  if (req.session.userId) {
    try {
      const product = await productsServices.product(req.params.any);
      const userData = await getData.getUserData(req.session.email);
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
