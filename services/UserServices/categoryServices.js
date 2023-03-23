import { Product } from '../../models/adminModel/productsModel'
import { mongo } from '../../config/mongoose'

mongo()

// Get all products in a category
export const getCategoryProducts = async (productCategory) => {
  try {
    const products = await Product.find({ productCategory })
      .populate('productCategory')
      .populate('productSubcategory')
    return products
  } catch (error) {
    console.error(error)
    throw new Error(
      `Error getting products added to wishlist: ${error.message}`
    )
  }
}