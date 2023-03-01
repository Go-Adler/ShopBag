const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    name: {
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
    image: {
        type: String,
        required: true
    },
    isInStock: {
      type: Number,
      required: true
    },
    isDisabled: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productsSchema)

module.exports = {
    Product
}