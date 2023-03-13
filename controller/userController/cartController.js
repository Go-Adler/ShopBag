// Render cart page
const renderCartPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render('user/cart', { title: "Cart", name });
  } catch (error) {
    console.error(error);
    res.send(`Error rendering cart page: ${error.message}`)
  }
};

module.exports = { renderCartPage }