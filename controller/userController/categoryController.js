import { getCategoryProducts } from '../../services/UserServices/categoryServices.js'
import { getWishlistedIDs } from '../../services/UserServices/productServices.js'

// get products of a category
export const getProductsInCategory = async (req, res) => {
  try {
    const { _id } = req.session
    const { categoryId } = req.body
    const page = req.body.page || 1
    const wishlist = await getWishlistedIDs(_id)
    const products = await getCategoryProducts(categoryId, page)
    res.json({ products, wishlist })
  } catch (error) {
    console.error(`Error in getting products in category #getProductsInCategoryController, ${error.message}`)
    return res.status(405).json({
      message: 'Error in getting products',
    })
  }
}