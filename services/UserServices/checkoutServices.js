import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Check if coupon used by user or not
export const checkCoupon = async (_id, code) => {
  try {
    const user = await User.findOne({ _id, usedCoupons: { $in: [code] } }, { "usedCoupons.$": 1, _id: 0 });
    return user ? true : false
  } catch (error) {
    console.error(`Error in check coupon used by user #service, ${error.message}`)
    throw new Error(`Error in check coupon used by user #service, ${error}`)
  }
}

