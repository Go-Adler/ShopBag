import { getWishlistedProducts } from '../../services/UserServices/productServices.js'
import { getAllCategories } from '../../services/AdminServices/productsServices.js'

// Render wishlist page
export const renderWishlistPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const wishlist = await getWishlistedProducts(_id)
    const categories = await getAllCategories()
    res.render('user/wishlist', {
      name,
      wishlist,
      title: 'Wishlist',
      categories,
    })
  } catch (error) {
    console.error(`Error in wishlist page render: ${error.message}`)
    res.render('error', {
      message: 'Error in wishlist page',
      previousPage: req.headers.referer,
    })
  }
}