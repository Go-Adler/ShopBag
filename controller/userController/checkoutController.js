const { getAllCategories } = require("../../services/AdminServices/productsServices")
const { getUserCart } = require("../../services/UserServices/cartServices")

// Render checkout page
const renderCheckoutPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const categories = await getAllCategories()
    const cart = await getUserCart(_id)

    res.render('user/checkout', { title: "Checkout", name, categories, cart });
  } catch (error) {
    console.error(error);
    res.send(`Error rendering checkout page: ${error.message}`)
  }
};

module.exports = { renderCheckoutPage }