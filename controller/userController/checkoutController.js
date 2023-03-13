// Render checkout page
const renderCheckoutPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render('user/checkout', { title: "Checkout", name });
  } catch (error) {
    console.error(error);
    res.send(`Error rendering checkout page: ${error.message}`)
  }
};

module.exports = { renderCheckoutPage }