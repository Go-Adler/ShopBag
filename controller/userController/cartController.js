import {
  getCartPopulated,
  quantityUpdate,
} from '../../services/UserServices/cartServices.js'

// Render cart page
export const renderCartPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const cart = await getCartPopulated(_id)
    res.render('user/cart', { title: 'Cart', name, cart })
  } catch (error) {
    console.error(`Error in cart render: ${error.message}`)
    res.render('error', {
      message: 'Error in cart page',
      previousPage: req.headers.referer,
    })
  }
}

// Increment quantity
export const incrementQuantity = async (req, res) => {
  try {
    const { quantity, product } = req.body
    const { _id } = req.session
    await quantityUpdate(_id, product, quantity)
    res.sendStatus(200)
  } catch (error) {
    console.error(`Error in quantity increment: ${error.message}`)
    res.render('error', {
      message: 'Error in quantity increment',
      previousPage: req.headers.referer,
    })
  }
}

// Decrement quantity
export const decrementQuantity = async (req, res) => {
  try {
    const { quantity, product } = req.body
    const { _id } = req.session
    await quantityUpdate(_id, product, quantity)
    res.sendStatus(200)
  } catch (error) {
    console.error(`Error in quantity decrement: ${error.message}`)
    res.render('error', {
      message: 'Error in quantity decrement',
      previousPage: req.headers.referer,
    })
  }
}