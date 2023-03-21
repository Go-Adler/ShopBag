const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")

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
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    productSubcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
        required: true
    }
})

productsSchema.plugin(mongoosePaginate);

const   Product = mongoose.model('Product', productsSchema)

module.exports = Product
