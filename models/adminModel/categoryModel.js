const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
})

const Category = mongoose.model("category", categorySchema)

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  isActive: {
    type: Number,
    required: true,
    default: true
  }
})

const Subcategory = mongoose.model("subcategory", subCategorySchema)

module.exports = {
  Category,
  Subcategory
}