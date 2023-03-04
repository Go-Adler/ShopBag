const { addProduct, getAllProducts } = require("../../services/AdminServices/productsServices.js");
const { getNameWithId } = require("../../services/UserServices/dataServices");
const sessionCheck = require("../../middlewares/commonMiddlewares")


// Render products page
const renderProductsPage = async (req, res) => {
  try {
    const { _id } = req.session
    const products = await getAllProducts();
    const userName = await getNameWithId(_id)
    res.render('admin/products', { userName, products });
  } catch (error) {
    throw new Error(`Error loading products page: ${error.message}`)
  }
};

// Render product add page
const renderProductAddPage = async (req, res) => {
  try {
    const { _id } = req.session
    const userName = await getNameWithId(_id)
    res.render('admin/products/productsAdd', { userName });
  } catch (error) {
    throw new Error(`Error loading products add page: ${error.message}`)
  }
};


// Function to add a new product
const productAdd = async (req, res) => {
  try {
    const { _id } = req.session
    const product = req.body
    await addProduct(product)
    const userName = getNameWithId(_id)
    res.render("admin/products/productsAdd", { userName, success: true, product })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error adding the product: ${error.message}`)
  }
}

// Render product edit page
const productsEditLoad = async (req, res) => {
  try {
    const userName = await getNameWithId(adminId)
    res.render("admin/products/productsEdit", { userName })
  } catch (error) {
    throw new Error(`Error loading products edit page: ${error.message}`)
  }
}



module.exports = {
  renderProductsPage,
  renderProductAddPage,
  productAdd
}