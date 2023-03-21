const { getUserCart, quantityUpdate } = require("../../services/UserServices/cartServices")
const { getAllCategories } = require("../../services/AdminServices/productsServices");

// Render cart page
const renderCartPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const cart = await getUserCart(_id)
    const categories = await getAllCategories()
    res.render('user/cart', { title: "Cart", name, cart, categories });
  } catch (error) {
    console.error(error);
    res.send(`Error rendering cart page: ${error.message}`)
  }
};

// Increment quantity
const incrementQuantity = async (req, res) => {
  try {
    const { quantity, product } = req.body
    const { _id } = req.session
    await quantityUpdate(_id, product, quantity)
    res.sendStatus(200)
  } catch (error) {
    console.error(error);
    res.send(`Error incrementing quantity: ${error.message}`)
  }
};

// Decrement quantity
const decrementQuantity = async (req, res) => {
  try {
    const { quantity, product } = req.body
    const { _id } = req.session
    await quantityUpdate(_id, product, quantity)
    res.sendStatus(200)
  } catch (error) {
    console.error(error);
    res.send(`Error decrementing quantity: ${error.message}`)
  }
};


module.exports = { renderCartPage, incrementQuantity, decrementQuantity }