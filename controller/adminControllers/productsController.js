const { addProduct} = require("../../services/AdminServices/productsServices.js");
const getData = require("../../services/UserServices/dataServices");

const productsEditLoad = async (req, res) => {
  try {
    const { adminId } = req.session

    if(!adminId) {
      res.redirect('signin')
    }

    const userName = await getData.getNameWithId(adminId)
    res.render("admin/products/productsEdit", { userName })
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error")
  }
}

const productsAddLoad = async (req, res) => {
  try {
    const { adminId } = req.session

    if (!adminId) {
      res.redirect("signin")
    }

    const userName = await getData.getNameWithId(adminId)
    res.render('admin/products/productsAdd', { userName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};


const productAdd = async (req, res) => {
 
    try {
      const { adminId } = req.session
      
      if(!adminId) {
        res.redirect("sigin")
      }

      const productData = req.body
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
    if (req.session.adminId) {
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