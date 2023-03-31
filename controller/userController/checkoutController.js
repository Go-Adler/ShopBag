import Razorpay from 'razorpay'

import {
  getAllCategories,
  createOrder,
  addCode
} from '../../services/adminServices/productsServices.js'
import {
  getUserCart,
  clearCart,
  getUserAddress,
  getCartProducts
} from '../../services/userServices/cartServices.js'
import { checkCoupon } from '../../services/userServices/checkoutServices.js'
import { getCouponWithName } from '../../services/adminServices/couponServices.js'
import { getAddress } from '../../services/userServices/orderServices.js'

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
    const currentDate = new Date()
    const { name, _id } = req.session
    const products = await getCartProducts(_id)
    const cart = await getUserCart(_id)
    const { code } = req.body
    if (code) await addCode(_id, code)
    let { address } = req.body
    address = await getAddress(_id, address)
    const { paymentMode } = req.body
    const { total } = req.body
    const orderDate = currentDate
    console.log(address, 56);
    await createOrder(_id, { products, address, total, paymentMode, orderDate })
    await clearCart(_id)
    res.render('user/placeOrder', {
      title: 'Place Order',
      name,
      cart
    })
  } catch (error) {
    console.error(`Error in place order page render: ${error.message}`)
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