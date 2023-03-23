import { getWishlistedProducts } from '../../services/userServices/productServices'
import { getAllCategories } from '../../services/adminServices/productsServices'

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
  } catch (error) {}
}