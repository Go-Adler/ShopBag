const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        default: []
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        default: []
    }
})

const User = mongoose.model('User', userSchema)

module.exports =  { User }