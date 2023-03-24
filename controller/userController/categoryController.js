import { getCategoryProducts } from '../../services/userServices/categoryServices.js'
import { getWishlistedIDs } from '../../services/userServices/productServices.js'
import { getAllCategories } from '../../services/adminServices/productsServices.js'

// Render grocery page
export const renderCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { name, _id } = req.session
    const wishlist = await getWishlistedIDs(_id)
    const products = await getCategoryProducts(id)
    const categories = await getAllCategories()
    res.render('user/category', {
      name,
      products,
      title: 'Category filtered',
      wishlist,
      categories,
    })
  } catch (error) {
    console.error(`Error in category render: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}