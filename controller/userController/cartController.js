import {
  getUserCart,
  quantityUpdate,
} from '../../services/userServices/cartServices'
import { getAllCategories } from '../../services/adminServices/productsServices'

// Render cart page
export const renderCartPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const cart = await getUserCart(_id)
    const categories = await getAllCategories()
    res.render('user/cart', { title: 'Cart', name, cart, categories })
  } catch (error) {
    console.error(error)
    res.send(`Error rendering cart page: ${error.message}`)
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
    console.error(error)
    res.send(`Error incrementing quantity: ${error.message}`)
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
    console.error(error)
    res.send(`Error decrementing quantity: ${error.message}`)
  }
}