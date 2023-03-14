const { getUserCart } = require("../../services/UserServices/cartServices")

// Render cart page
const renderCartPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const cart = await getUserCart(_id)
    res.render('user/cart', { title: "Cart", name, cart });
  } catch (error) {
    console.error(error);
    res.send(`Error rendering cart page: ${error.message}`)
  }
};

module.exports = { renderCartPage }