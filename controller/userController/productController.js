const { getProductWithId }=require("../../services/userServices/dataServices")

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

module.exports = renderProductPage