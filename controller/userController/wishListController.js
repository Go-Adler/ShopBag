import { getWishlistedProducts } from '../../services/userServices/productServices.js'
import { getAllCategories } from '../../services/adminServices/productsServices.js'

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
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}