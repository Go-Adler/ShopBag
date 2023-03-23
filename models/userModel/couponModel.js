import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
  code: {
    type: string,
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
})

export const Coupon = mongoose.model('Coupon', couponSchema)