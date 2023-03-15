const { getUserCart, cartAdd } = require("../../services/UserServices/cartServices")

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


// Add quantity
const addQuantity = async (req, res) => {
  try {
    const { quantity, product } = req.body
    const { _id } = req.session
    await cartAdd(_id, product, quantity)
    res.sendStatus(200)
  } catch (error) {
    console.error(error);
    res.send(`Error rendering cart page: ${error.message}`)
  }
};

module.exports = { renderCartPage, addQuantity }