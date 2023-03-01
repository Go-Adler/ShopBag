const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
  isActive: {
    type: Number,
    required: true
  }
})

const Category = mongoose.model("Category", categorySchema)

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  isActive: {
    type: Number,
    required: true
  }
})

const SubCategory = mongoose.model("SubCategory", subCategorySchema)

module.exports = {
  Category,
  SubCategory
}