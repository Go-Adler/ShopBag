import { Category, Subcategory } from '../../models/adminModel/categoryModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Function to add category
export const addCategory = async (name) => {
  try {
    await Category.create({ name })
    return true
  } catch (error) {
    console.error(`Error in add category: ${error.message}`)
    throw new Error(`Error in add category ${error}`)
  }
}

// Function to edit category
export const updateCategory = async (id, name) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    )

    return true
  } catch (error) {
    console.error(`Error in update category: ${error.message}`)
    throw new Error(`Error in update category ${error}`)
  }
}

// Function to disable category
export const disableCategory = async (_id) => {
  try {
    await Category.findOneAndUpdate({ _id }, { isActive: false })
    return true
  } catch (error) {
    console.error(`Error in disable category: ${error.message}`)
    throw new Error(`Error in disable category ${error}`)
  }
}

// Funtion to enable category
export const enableCategory = async (_id) => {
  try {
    await Category.findOneAndUpdate({ _id }, { isActive: true })

    return true
  } catch (error) {
    console.error(`Error in enable category: ${error.message}`)
    throw new Error(`Error in enable category ${error}`)
  }
}

// Function ot get all category
export const getAllCategories = async () => {
  try {
    const categories = await Category.find()
    return categories
  } catch (error) {
    console.error(`Error in get all category: ${error.message}`)
    throw new Error(`Error in get all category ${error}`)
  }
}

// Function ot get all category
export const getAllSubcategories = async () => {
  try {
    const subcategories = await Subcategory.find()
    return subcategories
  } catch (error) {
    console.error(`Error in get all subcategory: ${error.message}`)
    throw new Error(`Error in get all subcategory ${error}`)
  }
}

// Function to validate category
export const validateCategory = async (name) => {
  try {
    const exists = await Category.findOne({ name })
    if (exists) {
      return true
    }
    return false
  } catch (error) {
    console.error(`Error in validate category: ${error.message}`)
    throw new Error(`Error in validate category ${error}`)
  }
}

// Function to validate category with id
export const validateCategoryWithId = async (_id) => {
  try {
    const exists = await Category.findOne({ _id })
    if (exists) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(`Error in validate category with id: ${error.message}`)
    throw new Error(`Error in validate category with id ${error}`)
  }
}

// Get Category name with id
export const getCategoryNameWithId = async (id) => {
  try {
    const name = await Category.findById(id).select('name -_id')
    return name.name
  } catch (error) {
    console.error(`Error in get category name with id: ${error.message}`)
    throw new Error(`Error in get get category name with id ${error}`)
  }
}