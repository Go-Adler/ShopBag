import mongoose from "mongoose"

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
})

const orderSchema = new mongoose.Schema({
  products: {
    type: [cartItemSchema]
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
  },
  total: {
    type: Number
  },
  orderStatus: {
    type: String,
    default: 'pending'
  },
  paymentMode: {
    type: String
  },
  orderDate: {
    type: Date
  }
})

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number : {
    type: Number,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  landmark: {
    type: String
  },
  addressType: {
    type: String,
    required: true
  }
})

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },
  cart: {
    type: [cartItemSchema],
    default: [],
  },
  address: {
    type: [addressSchema],
    default: [],
  },
  orders: {
    type: [orderSchema],
    default: []
  },
  usedCoupons: {
    type: [mongoose.Schema.Types.ObjectId]
  }
})

export const User = mongoose.model("User", userSchema)

