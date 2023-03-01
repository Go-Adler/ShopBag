const productsServices = require("../../services/AdminServices/productsServices.js");
const verify = require("../helper/userHelper/verifyData");

const productsEditLoad = async (req, res) => {
  if(req.session && req.session.adminEmail) {
    try {
      const userData = await verify.userData(req.session.adminEmail)
      const productsData = await productsServices.productsData()
      res.render("admin/products", {userName: userData.name, productsData})
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  productsEditLoad
}