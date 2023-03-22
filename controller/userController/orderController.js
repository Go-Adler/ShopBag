const { getAllCategories } = require("../../services/AdminServices/productsServices");
const { getOrders } = require("../../services/UserServices/orderServices")

// Render wishlist page
const renderOrdersPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const categories = await getAllCategories()
    const orders = await getOrders(_id)

    res.render('user/myOrders', { name, title: 'My orders', categories, orders });
  } catch (error) {
    
  }
}

module.exports = { renderOrdersPage }