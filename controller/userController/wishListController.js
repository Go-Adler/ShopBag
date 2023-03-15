const { getWishlistedProducts } = require("../../services/UserServices/productServices")
const { getAllCategories } = require("../../services/AdminServices/productsServices");


// Render wishlist page
const renderWishlistPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const wishlist = await getWishlistedProducts(_id)
    const categories = await getAllCategories()

    res.render('user/wishlist', { name, wishlist, title: 'Wishlist', categories });
  } catch (error) {
    
  }
}

module.exports = { renderWishlistPage }