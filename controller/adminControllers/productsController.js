const { getAllProducts, productDisable, addProduct, productEnable, getProduct, productUpdate } = require("../../services/AdminServices/productsServices.js");
const { getAllCategories, getAllSubcategories } = require("../../services/AdminServices/categoryServices")
const url = require("url")

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
    const categories = await getAllCategories()
    const subcategories = await getAllSubcategories()
    res.render('admin/products/productsAdd', { name, categories, subcategories });
  } catch (error) {
    throw new Error(`Error loading products add page: ${error.message}`)
  }
};


// Function to add a new product
const productAdd = async (req, res) => {
  try {
    const { productName } = req.body
    const product = req.body
    product.images = req.files
    await addProduct(product)
    res.redirect(url.format({pathname: "/admin/products/add", success: true, productName: productName }));
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error adding the product: ${error.message}`)
  }
}

// Render product edit
const productEdit = async (req, res) => {
  try {
    const { id } = req.params
    const product = req.body
    const success = await productUpdate(id, product)
    res.redirect('admin/products/productsEdit');
  } catch (error) {
    throw new Error(`Error loading products add page: ${error.message}`)
  }
};

// Render product edit page
const renderProductEditPage = async (req, res) => {
  try {
    const { name } = req.session
    const { id } = req.params
    const product = await getProduct(id)
    const categories = await getAllCategories()
    const subcategories = await getAllSubcategories()
    res.render('admin/products/productsEdit', { name, product, subcategories, categories});
  } catch (error) {
    throw new Error(`Error loading products add page: ${error.message}`)
  }
};

// Controller to disable product
const disableProduct = async (req, res) => {
  try {
    const { productId } = req.body
    await productDisable(productId)
    res.status(200).send();
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error adding the product: ${error.message}`)
  }
}

// Controller to enable product
const enableProduct = async (req, res) => {
  try {
    const { productId } = req.body
    await productEnable(productId)
    res.status(200).send();
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error adding the product: ${error.message}`)
  }
}



module.exports = {
  renderProductsPage,
  renderProductAddPage,
  renderProductEditPage,
  productAdd,
  disableProduct,
  enableProduct
}