import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  minimumAmount: {
    type: Number,
  },
  maximumAmount: {
    type: Number,
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

export const Coupon = mongoose.model('Coupon', couponSchema)