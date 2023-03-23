import mongoose from 'mongoose'

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

export const Category = mongoose.model("category", categorySchema)

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

export const Subcategory = mongoose.model("subcategory", subCategorySchema)