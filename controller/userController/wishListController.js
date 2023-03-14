const { getWishlistedProducts } = require("../../services/UserServices/productServices")
const { getAllProducts } = require("../../services/AdminServices/productsServices");


// Render wishlist page
const renderWishlistPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const wishlist = await getWishlistedProducts(_id)
    res.render('user/wishlist', { name, wishlist, title: 'Wishlist' });
  } catch (error) {
    
  }
}

module.exports = { renderWishlistPage }