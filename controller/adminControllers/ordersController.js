import { getOrders } from "../../services/adminServices/orderServices.js"
import { getOrder } from '../../services/userServices/orderServices.js'

// Render coupon page
export const renderOrdersPage = async (req, res) => {
  try {
    const { name } = req.session
    const orders = await getOrders()
    res.render('admin/orders', {
      name,
      title: 'Coupon',
      orders
    })
  } catch (error) {
    console.error(`Error rendering coupon page: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}


// Render order details
export const renderOrderDetailsPage = async (req, res) => {
  try {
    const { name } = req.session
    const { _id, userId } = req.params
    const { address , order} = await getOrder(userId, _id)
    console.log(30, req.originalUrl, 30);
    res.render('admin/orderDetails', {
      name,
      title: 'Coupon',
      order,
      address
    })
  } catch (error) {
    console.error(`Error rendering coupon page: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}