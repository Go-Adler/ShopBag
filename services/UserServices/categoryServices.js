import { Product } from '../../models/adminModel/productsModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Get all products in a category
export const getCategoryProducts = async (productCategory, page) => {
  try {
    let products
    if (productCategory !== 'all') {
      products = await Product.paginate({ productCategory, isDisable: false }, { page, limit: 9, populate: 'productCategory productSubcategory' })
    } else {
      products = await Product.paginate({ isDisable: false }, { page, limit: 9, populate: 'productCategory productSubcategory' })
    }
    return products
  } catch (error) {
    console.error(`Error in get category products: ${error.message}`)
    throw new Error(`Error in get category products: ${error}`)
  }
}