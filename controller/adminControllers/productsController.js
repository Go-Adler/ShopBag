const { addProduct, getAllProducts } = require("../../services/AdminServices/productsServices.js");


// Render products page
const renderProductsPage = async (req, res) => {
  try {
    const { name } = req.session
    const products = await getAllProducts();
    res.render('admin/products', { name, products });
  } catch (error) {
    throw new Error(`Error loading products page: ${error.message}`)
  }
};
  
// Render product add page
const renderProductAddPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render('admin/products/productsAdd', { name });
  } catch (error) {
    throw new Error(`Error loading products add page: ${error.message}`)
  }
};


// Function to add a new product
const productAdd = async (req, res) => {
  try {
    const { name } = req.session
    const { productName } = req.body
    const product = req.body
    product.images = req.files
    console.log(product.images, 'file name');
    await addProduct(product)
    res.render("admin/products/productsAdd", { name, success: true, productName })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error adding the product: ${error.message}`)
  }
}

// Render product edit page
const productsEditLoad = async (req, res) => {
  try {
    const { name } = req.session
    res.render("admin/products/productsEdit", { name })
  } catch (error) {
    throw new Error(`Error loading products edit page: ${error.message}`)
  }
}



module.exports = {
  renderProductsPage,
  renderProductAddPage,
  productAdd
}