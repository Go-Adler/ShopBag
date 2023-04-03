import Razorpay from 'razorpay'

import {
  getAllCategories,
  createOrder,
  addCode
} from '../../services/adminServices/productsServices.js'
import {
  clearCart,
  getUserAddress,
  getCart,
  getCartPopulated,
  stockUpdateAfterPurchase
} from '../../services/userServices/cartServices.js'
import { checkCoupon } from '../../services/userServices/checkoutServices.js'
import { getCouponWithName } from '../../services/adminServices/couponServices.js'
import { getAddress } from '../../services/userServices/orderServices.js'

// Render checkout page
export const renderCheckoutPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const categories = await getAllCategories()
    const cart = await getCartPopulated(_id)
    const address = await getUserAddress(_id)

    res.render('user/checkout', {
      title: 'Checkout',
      name,
      categories,
      cart,
      address,
    })
  } catch (error) {
    console.error(`Error in checkout page render: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Render place order page
export const renderPlaceOrderPage = async (req, res) => {
  try {
    // Finding current date to set order date
    const currentDate = new Date()

    // Finding user name and user _id which are stored in session
    const { name, _id } = req.session

    // Storing user id in userId variable as order model to create order
    const userId = _id

    // Get the products in the cart for creating orders
    const products = await getCart(_id)

    // Get user cart populated to render order placed page
    const cart = await getCartPopulated(_id)

    // Getting coupon code to save it in user document
    const { code } = req.body

    // Check is request object has code inside it and if code exist adding the code to the user document
    if (code) await addCode(_id, code)

    // Getting address id from request object
    let { address } = req.body

    // Getting address with user id and address id
    address = await getAddress(_id, address)

    // Getting other datas for creating order
    const { paymentMode } = req.body
    const { total } = req.body
    const orderDate = currentDate
    
    // Creating a new order for the user
    await createOrder(_id, { products, address, total, paymentMode, orderDate, userId })

    // Update stock
    await stockUpdateAfterPurchase(products)

    // Clearing the cart after creating order
    await clearCart(_id)

    // Rendering order placed page
    res.render('user/placeOrder', {
      title: 'Place Order',
      name,
      cart
    })
  } catch (error) {
    console.error(`Error in place order page render #controller: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Controller to apply coupon
export const applyCoupon = async (req, res) => {
  try {
    const { couponCode, total } = req.body
    const { _id } = req.session
    const status = await checkCoupon(_id, couponCode)
    if (!status) {
      const coupon = await getCouponWithName(couponCode)
      if (coupon) {
        const currentDate = new Date()
        if (coupon.expiryDate < currentDate ) return res.json({ invalid: `Sorry, this coupon expired.`})
        if (total < coupon.minimumAmount ) return res.json({ invalid: `Total amount not reaching minimum requirement: ₹${coupon.minimumAmount}.` })
        let discount = ((total * coupon.discount) / 100)
        if ( discount > coupon.maximumAmount ) discount = coupon.maximumAmount
        res.json({ discount })
      } else {
        return res.json({ invalid: 'No coupon found for this code.'})
      }
    } else {
      res.json({ invalid: 'Coupon already used by this user' })
    }
  } catch (error) {
    console.error(`Error in applying coupon #controller: ${error.message}`)
    res.status(405).json({message:`${error.message}`})
  }
}

// Razorpay controller
export const razorpayController = async (req, res) => {
  try {
    let { amount } = req.body
    amount = amount * 100
    const instance = new Razorpay({
      key_id: 'rzp_test_ZVlm7mJKVkO7Pm',
      key_secret: '4qnLCC2FZnX7wq8Cbresr3Iv'
    })

    let order = instance.orders.create({
      amount,
      currency: 'INR',
      receipt: "receipt#1"
    })

     res.status(201).json({
      success: true,
      amount,
      order
    })

  } catch (error) {
    console.error(`Error in razorpay controller, ${error.message}`)
   res.status(201).json({
    error: `error`
   })
  }
}

// Controller to render razor pay
export const rendorRazorpay = async (req, res) => {
  try {
    const form = req.body
    res.render('user/razorpay', { form })
  } catch (error) {
    console.error(`Error in razorpay controller, ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

export const stockUpdate = async (req, res) => {

}