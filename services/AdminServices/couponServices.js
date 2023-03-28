import { Coupon } from '../../models/userModel/couponModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Function to check a coupon alreadye existing or not
export const couponExits = async (code) => {
  try {
    const exists = await Coupon.findOne({ code })
    return exists ? true : false
  } catch (error) {
    console.error(`Error in service, checking coupon existence, ${error.message}`)
    throw new Error(`Error in service, checking coupon existence, ${error}`)
  }
}

// Function to add coupon
export const addCoupon = async (coupon) => {
  try {
    await Coupon.create(coupon)
    return true
  } catch (error) {
    console.error(`Error in service, adding new coupon, ${error.message}`)
    throw new Error(`Error in service, adding new coupon, ${error}`)
  }
}

// Function to get all coupons
export const getCoupons = async () => {
  try {
    const coupons = await Coupon.find()
    return coupons
  } catch (error) {
    console.error(`#service, Error in finding all coupons, ${error.message}`)
    throw new Error(`#service, Error in finding all coupons, ${error}`)
  }
}

// Function to disable coupon
export const disableCoupon = async (id) => {
  try {
    await Coupon.findByIdAndUpdate(id, { isDisabled: true }, { new: true })
    return true
  } catch (error) {
    console.error(`#service, Error in coupon disable, ${error.message}`)
    throw new Error(`#service, Error in coupon disable, ${error}`)
  }
}

// Function to enable coupon
export const enableCoupon = async (id) => {
  try {
   await Coupon.findByIdAndUpdate(id, { isDisabled: false })
    return true
  } catch (error) {
    console.error(`#service, Error in coupon enable, ${error.message}`)
    throw new Error(`#service, Error in coupon enable, ${error}`)
  }
}

// Function to check a coupon alreadye existing or not with id
export const couponExitsById = async (id) => {
  try {
    const exists = await Coupon.findById(id)
    return exists ? true : false
  } catch (error) {
    console.error(`Error in service, checking coupon existence with id, ${error.message}`)
    throw new Error(`Error in service, checking coupon existence with id, ${error}`)
  }
}

// Function to get coupon with id
export const getCoupon = async (id) => {
  try {
    const coupon = await Coupon.findById(id)
    return coupon ? coupon : false
  } catch (error) {
    console.error(`#service, Error in get coupon with id, ${error.message}`)
    throw new Error(`#service, Error in get coupon with id, ${error}`)
  }
}

// Function to edit coupon
export const editCoupon = async (id, coupon) => {
  try {
    const couponUpdated = await Coupon.findByIdAndUpdate(id, coupon, { new: true })
    return couponUpdated
  } catch (error) {
    console.error(`Error in service, updating existing coupon, ${error.message}`)
    throw new Error(`Error in service, updating existing coupon, ${error}`)
  }
}

// Function to get coupon with name
export const getCouponWithName = async (code) => {
  try {
    const coupon = await Coupon.findOne({ code }, { _id: 0})
    return coupon ? coupon : false
  } catch (error) {
    console.error(`#service, Error in get coupon with name, ${error.message}`)
    throw new Error(`#service, Error in get coupon with name, ${error}`)
  }
}
