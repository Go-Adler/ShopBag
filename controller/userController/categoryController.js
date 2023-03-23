import { getCategoryProducts } from '../../services/userServices/categoryServices'
import { getWishlistedIDs } from '../../services/userServices/productServices'
import { getAllCategories } from '../../services/adminServices/productsServices'

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
    res.status(500).send(`Error rendering category page: ${error.message}`)
  }
}