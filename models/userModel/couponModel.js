const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema({
  code: {
    type: string,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  minimumAmount: {
    type: Number,
  },
  maximumAmount: {
    type: Number,
  }
})

const Coupon = mongoose.model("Coupon", couponSchema)

module.exports = { Coupon }