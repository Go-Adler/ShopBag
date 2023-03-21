const { stringify } = require("querystring")

const { getAllProductsPaginated, productDisable, addProduct, productEnable, getProduct, productUpdate } = require("../../services/AdminServices/productsServices.js");
const { getAllCategories, getAllSubcategories } = require("../../services/AdminServices/categoryServices")

// Render products page
const renderProductsPage = async (req, res) => {
  try {
    const { addSuccess, editSuccess, productName, message } = req.query
    const { name } = req.session
    const products = await getAllProductsPaginated();
    res.render('admin/products', { name, products, title: 'Products list admin', editSuccess, productName, addSuccess, message });
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
    res.render('admin/products/productsAdd', { name, categories, subcategories, title: 'Add product' });
  } catch (error) {
    throw new Error(`Error loading products add page: ${error.message}`)
  }
};

// Function to add a new product
const productAdd = async (req, res) => {
  try {
    const { productName } = req.body
    if (req.fileValidationError) {
      const message = "Only image files are accepted, try updating again"
      const statusObject = {
        message
      };
      const statusString = stringify(statusObject);
      return res.redirect("/admin/products?" + statusString);
    }
    const product = req.body
    product.images = req.files
    const addSuccess = await addProduct(product)
     const statusObject = {
      addSuccess,
      productName 
    };
    const statusString = stringify(statusObject);
    res.redirect("/admin/products?" + statusString);
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error adding the product: ${error.message}`)
  }
}

// Function to handle product edit
const productEdit = async (req, res) => {
  try {
    const product = req.body
    if (req.fileValidationError) {
      const message = "Only image files are accepted, try updating again"
      const statusObject = {
        message
      };
      const statusString = stringify(statusObject);
      return res.redirect("/admin/products?" + statusString);
    }
    const { id } = req.params
    product.images = req.files
    const editSuccess = await productUpdate(id, product)

    const { productName } = product
    const statusObject = {
      editSuccess,
      productName 
    };
    const statusString = stringify(statusObject);
    res.redirect("/admin/products?" + statusString);
  } catch (error) {
    throw new Error(`Error updating the product: ${error.message}`)
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
    res.render('admin/products/productEditNew', { name, product, subcategories, categories, title: 'Product edit'});
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
  enableProduct,
  productEdit
}