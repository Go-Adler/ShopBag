const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true,
        default: true
    },
    isDisabled: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Product = mongoose.model('Product', productsSchema)

module.exports = Product
