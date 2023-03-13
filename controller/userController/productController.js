const { getProductWithId }=require("../../services/userServices/dataServices")
const { updateWishList } = require("../../services/UserServices/productServices")

// Render product page
const renderProductPage = async (req, res) => {
  try {
    const { name } = req.session
    const { id } = req.params
    const product = await getProductWithId(id);
    res.render('user/product', { name, product });
  } catch (error) {
    console.error(error);
    res.send(`Error loading products page: ${error.message}`)
  }
};

// Toggle wishlist 
const toggleWishList = async (req, res) => {
  try {
    const { name, _id } = req.session
    const { id } = req.params
    const product = await updateWishList(_id, id);
    res.render('user/product', { name, product });
  } catch (error) {
    console.error(error);
    res.send(`Error loading products page: ${error.message}`)
  }
};



module.exports = { renderProductPage, toggleWishList }