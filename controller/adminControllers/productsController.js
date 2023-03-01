const productsServices = require("../../services/AdminServices/productsServices.js");
const verify = require("../../helper/userHelper/verifyData");

const productsEditLoad = async (req, res) => {
  if(req.session && req.session.adminEmail) {
    try {
      const userData = await verify.userData(req.session.adminEmail)
      res.render("admin/products/productsEdit", { userName: userData.name })
    } catch (err) {
      console.error(err);
    }
  }
}

const productsAddLoad = async (req, res) => {
  if(req.session && req.session.adminEmail) {
    try {
      const userData = await verify.userData(req.session.adminEmail)
      res.render("admin/products/productsAdd", { userName: userData.name })
    } catch (err) {
      console.error(err);
    }
  }
}

const productAdd = async (req, res) => {
  if(req.session && req.session.adminEmail) {
    try {
      const userData = await productsServices.add(req.body)
      res.render("admin/products/productsAdd", { userName: userData.name, message: true })
    } catch (err) {
      console.error(err);
      res.render("admin/products/productsAdd", { userName: userData.name, message: false })
    }
  }
}

const productsLoad = async (req, res) => {
  if (req.session && req.session.adminEmail) {
    try {
      const products = await productsServices.data()
      console.log(products, 'ccccccccccccccccccccccccccccccccccccccccccccccccccc');
      const userData = await verify.userData(req.session.adminEmail);
      res.render("admin/products", { userName: userData.name, products: products });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("signin");
  }
};

module.exports = {
  productsEditLoad,
  productsAddLoad,
  productsLoad,
  productAdd
}