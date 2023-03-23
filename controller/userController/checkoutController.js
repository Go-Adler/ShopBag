import {
  getAllCategories,
  createOrder,
} from '../../services/adminServices/productsServices'
import {
  getUserCart,
  clearCart,
  getUserAddress,
} from '../../services/userServices/cartServices'

// Render checkout page
export const renderCheckoutPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const categories = await getAllCategories()
    const cart = await getUserCart(_id)
    const address = await getUserAddress(_id)

    res.render('user/checkout', {
      title: 'Checkout',
      name,
      categories,
      cart,
      address,
    })
  } catch (error) {
    console.error(error)
    res.send(`Error rendering checkout page: ${error.message}`)
  }
}

// Render checkout page
export const renderPlaceOrderPage = async (req, res) => {
  try {
    const currentDate = new Date()
    const { name, _id } = req.session
    const cart = await getUserCart(_id)
    const products = cart
    const categories = await getAllCategories()
    const address = req.body.address[0]
    const paymentMode = req.body.paymentMethod
    const total = req.body.total
    const orderDate = currentDate
    await createOrder(_id, { products, address, total, paymentMode, orderDate })
    clearCart(_id)
    res.render('user/placeOrder', {
      title: 'Place Order',
      name,
      categories,
      cart,
    })
  } catch (error) {
    console.error(error)
    res.send(`Error rendering checkout page: ${error.message}`)
  }
}