import { Product } from '../../models/adminModel/productsModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Get all products in a category
export const getCategoryProducts = async (productCategory) => {
  try {
    const products = await Product.find({ productCategory })
      .populate('productCategory')
      .populate('productSubcategory')
    return products
  } catch (error) {
    console.error(`Error in get category products: ${error.message}`)
    throw new Error(`Error in get category products: ${error}`)
  }
}