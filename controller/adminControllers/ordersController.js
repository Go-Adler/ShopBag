import { getOrders } from "../../services/adminServices/orderServices.js"
import { getOrder, toShipped, toOutForDelivery } from '../../services/userServices/orderServices.js'

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
    const order = await getOrder(userId, _id)
    const { originalUrl } = req
    res.render('admin/orderDetails', {
      name,
      title: 'Coupon',
      order,
      originalUrl
    })
  } catch (error) {
    console.error(`Error rendering coupon page: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Change order status to shipped
export const orderToShipped = async (req, res) => {
  try {
    const { name } = req.session
    const { _id, userId } = req.params
    await toShipped(userId, _id)
    const order = await getOrder(userId, _id)
    const { originalUrl } = req
    console.log(req.headers.referer, 53);
    res.render('admin/orderDetails', {
      name,
      title: 'Coupon',
      order,
      originalUrl
    })
  } catch (error) {
    console.error(`Error in change status to order to shipped #controller: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Change order status to out for delivery
export const orderOutForDelivery = async (req, res) => {
  try {
    const { name } = req.session
    const { _id, userId } = req.params
    await toOutForDelivery(userId, _id)
    const order = await getOrder(userId, _id)
    const { originalUrl } = req
    console.log(req.headers.referer, 53);
    res.render('admin/orderDetails', {
      name,
      title: 'Coupon',
      order,
      originalUrl
    })
  } catch (error) {
    console.error(`Error in change status to order to delivery #controller: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}