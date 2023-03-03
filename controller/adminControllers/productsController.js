const { addProduct, getAllProducts } = require("../../services/AdminServices/productsServices.js");
const { getNameWithId } = require("../../services/UserServices/dataServices");
const sessionCheck = require("../../services/commonServices")

const productsEditLoad = async (req, res) => {
  try {
    const { adminId } = req.session

    sessionCheck(adminId)
    const userName = await getNameWithId(adminId)
    res.render("admin/products/productsEdit", { userName })
  } catch (error) {
    throw new Error(`Error loading products edit page: ${error.message}`)
  }
}

const productsAddLoad = async (req, res) => {
  try {
    const { adminId } = req.session

    sessionCheck(adminId)
    const userName = await getNameWithId(adminId)
    res.render('admin/products/productsAdd', { userName });
  } catch (error) {
    throw new Error(`Error loading products add page: ${error.message}`)
  }
};

const productAdd = async (req, res) => {
    try {
      const { adminId } = req.session
      
      sessionCheck(adminId)
      const product = req.body
      await addProduct(product)
      const userName = getNameWithId(adminId)
      res.render("admin/products/productsAdd", { userName, message: true })
    } catch (error) {
      console.error(error)
      res.status(500).send(`Error adding the product: ${error.message}`)
    }
}

const productsLoad = async (req, res) => {
  try {
    const { adminId } = req.session

    sessionCheck(adminId)
    const products = await getAllProducts();
    const userName = await getNameWithId(adminId)
    res.render('admin/products', { userName, products });
  } catch (error) {
    throw new Error(`Error loading products page: ${error.message}`)
  }
};

module.exports = {
  productsEditLoad,
  productsAddLoad,
  productsLoad,
  productAdd
}