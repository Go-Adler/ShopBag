import mongoose from "mongoose"

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    }  
  },
  { _id: false }
)

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

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }]
});

const orderSchema = new mongoose.Schema({
  products: {
    type: [cartItemSchema]
  },
  address: {
    type: addressSchema,
  },
  total: {
    type: Number
  },
  orderStatus: {
    type: String,
    default: 'confirmed'
  },
  paymentMode: {
    type: String
  },
  orderDate: {
    type: Date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
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
    type: [String]
  },
  wallet: {
    type: walletSchema,
  }
})

export const Address = mongoose.model("Address", addressSchema)
export const User = mongoose.model("User", userSchema)

