const { getProductWithId }=require("../../services/userServices/dataServices")

// Render product page
const renderProductPage = async (req, res) => {
  console.log('racing here');
  try {
    const { name } = req.session
    const { id } = req.params
    console.log(id, 'idd');
    const product = await getProductWithId(id);
    console.log(product,'iiiiiiiiii');
    res.render('user/product', { name, product });
  } catch (error) {
    console.error(error);
    res.send(`Error loading products page: ${error.message}`)
  }
};

module.exports = renderProductPage