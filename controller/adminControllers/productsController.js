import { stringify } from 'querystring'
import {
  getAllProductsPaginated,
  productDisable,
  addProduct,
  productEnable,
  getProduct,
  productUpdate
} from '../../services/AdminServices/productsServices.js'
import {
  getAllCategories,
  getSubcatergoriesOfCategoryWithId
} from '../../services/AdminServices/categoryServices.js'

// Render products page
export const renderProductsPage = async (req, res) => {
  const { fetch } = req.body
  try {
    const { addSuccess, editSuccess, productName, message } = req.query
    const { name } = req.session
    const page = req.body.page || 1
    const products = await getAllProductsPaginated(page)
    if (fetch) {
      res.json({ products })
    } else {
      res.render('admin/products', {
        name,
        products,
        title: 'Products list admin',
        editSuccess,
        productName,
        addSuccess,
        message,
      })
    }
  } catch (error) {
    if (fetch) {
      console.error(`Error in fetching products #renderProductsController: ${error.message}`)
      res.status(405).json({message: 'Error getting products'})
    } else {
      console.error(`Error loading products page: ${error.message}`)
      res.render('error', {
        message: 'Error in products page',
        previousPage: req.headers.referer,
      })
    }
  }
}

// Render product add page
export const renderProductAddPage = async (req, res) => {
  try {
    const { name } = req.session
    const categories = await getAllCategories()
    res.render('admin/products/productsAdd', {
      name,
      categories,
      title: 'Add product',
    })
  } catch (error) {
    console.error(`Error rendering product add page: ${error.message}`)
    res.render('error', {
      message: 'Error in product add page',
      previousPage: req.headers.referer,
    })
  }
}

// Function to add a new product
export const productAdd = async (req, res) => {
  try {
    const { productName } = req.body
    if (req.fileValidationError) {
      const message = 'Only image files are accepted, try updating again'
      const statusObject = {
        message,
      }
      const statusString = stringify(statusObject)
      return res.redirect('/admin/products?' + statusString)
    }
    const product = req.body
    product.images = req.files
    const addSuccess = await addProduct(product)
    const statusObject = {
      addSuccess,
      productName,
    }
    const statusString = stringify(statusObject)
    res.redirect('/admin/products?' + statusString)
  } catch (error) {
    console.error(`Error adding new page: ${error.message}`)
    res.render('error', {
      message: 'Error in product add',
      previousPage: req.headers.referer,
    })
  }
}

// Function to handle product edit
export const productEdit = async (req, res) => {
  try {
    const product = req.body
    if (req.fileValidationError) {
      const message = 'Only image files are accepted, try updating again'
      const statusObject = {
        message,
      }
      const statusString = stringify(statusObject)
      return res.redirect('/admin/products?' + statusString)
    }
    const { id } = req.params
    product.images = req.files
    const editSuccess = await productUpdate(id, product)

    const { productName } = product
    const statusObject = {
      editSuccess,
      productName,
    }
    const statusString = stringify(statusObject)
    res.redirect('/admin/products?' + statusString)
  } catch (error) {
    console.error(`Error rendering sign in page: ${error.message}`)
    res.render('error', {
      message: 'Error in sign in page',
      previousPage: req.headers.rmgeferer,
    })
  }
}

// Render product edit page
export const renderProductEditPage = async (req, res) => {
  try {
    const { name } = req.session
    const { id } = req.params
    const product = await getProduct(id)
    const categories = await getAllCategories()
    const { _id } = product.productCategory
    const subcategories = await getSubcatergoriesOfCategoryWithId(_id)
    res.render('admin/products/productEditNew', {
      name,
      product,
      categories,
      subcategories,
      title: 'Product edit',
    })
  } catch (error) {
    console.error(`Error rendering product edit page: ${error.message}`)
    res.render('error', {
      message: 'Error in product edit page',
      previousPage: req.headers.referer,
    })
  }
}

// Controller to disable product
export const disableProduct = async (req, res) => {
  try {
    const { productId } = req.body
    await productDisable(productId)
    res.status(200).send()
  } catch (error) {
    console.error(`Error in disabling product: ${error.message}`)
    res.render('error', {
      message: 'Error in product disable',
      previousPage: req.headers.referer,
    })
  }
}

// Controller to enable product
export const enableProduct = async (req, res) => {
  try {
    const { productId } = req.body
    await productEnable(productId)
    res.status(200).send()
  } catch (error) {
    console.error(`Error in enabling product: ${error.message}`)
    res.render('error', {
      message: 'Error in enable product',
      previousPage: req.headers.referer,
    })
  }
}

// Render product add page
export const getSubcatergoriesOfCategory = async (req, res) => {
  try {
    const { id } = req.params
    const subcategories = await getSubcatergoriesOfCategoryWithId(id)
    res.json({ subcategories })
  } catch (error) {
    console.error(`Error getting subcategoris of a category: ${ error.message }`)
    res.status(500).json({ message: 'Error getting subcategories'})
  }
}