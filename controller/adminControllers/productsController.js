const productsServices = require("../../services/AdminServices/productsServices.js");
const verify = require("../../services/UserServices/getData");

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
  try {
    if (req.session && req.session.adminEmail) {
      res.render('admin/products/productsAdd', { userName: req.session.name });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};


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
  try {
    if (req.session && req.session.adminEmail) {
      const products = await productsServices.data();
      res.render('admin/products', { userName: req.session.name, products });
    } else {
      res.redirect('signin');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};


module.exports = {
  productsEditLoad,
  productsAddLoad,
  productsLoad,
  productAdd
}