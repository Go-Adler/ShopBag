import { getOrders, getUserOrder } from "../../services/adminServices/orderServices.js"

// Render coupon page
export const renderOrdersPage = async (req, res) => {
  try {
    const { name } = req.session
    const orders = await getOrders()
    console.log(orders, 8);
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
    const { id, user } = req.params
    const orders = await getUserOrder(id, user)
    res.render('admin/orderDetails', {
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