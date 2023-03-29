import { getAllCategories } from '../../services/adminServices/productsServices.js'
import { getOrders, getOrder } from '../../services/userServices/orderServices.js'

// Render wishlist page
export const renderOrdersPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const categories = await getAllCategories()
    const orders = await getOrders(_id)
    res.render('user/myOrders', {
      name,
      title: 'My orders',
      categories,
      orders,
    })
  } catch (error) {
    console.error(`Error in orders page render: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Render order details pages
export const renderOrdersDetailsPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const { id } = req.params
    const orders = await getOrder(_id, id)
    res.render('user/orderDetails', {
      name,
      title: 'My orders',
      orders,
    })
  } catch (error) {
    console.error(`Error in orders page render: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}