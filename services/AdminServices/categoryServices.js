const { Category, Subcategory } = require("../../models/adminModel/categoryModel")
import { mongo } from "../../config/mongoose"

mongo();

// Function to add category
const addCategory = async name => {
  try {
    await Category.create({ name })
    return true
  } catch (error) {
    console.error(`Failed to create category: ${error}`)
    return false
  }
}

// Function to edit category
const updateCategory = async (id, name) => {
  try {
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true })

    return true
  } catch (error) {
    console.error(`Failed to update category: ${error}`)
    return false
  }
}

// Function to disable category
const disableCategory = async _id => {
  try {
  await Category.findOneAndUpdate({ _id }, { isActive: false })
  return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// Funtion to enable category
const enableCategory = async _id => {
  try {

  await Category.findOneAndUpdate({ _id }, { isActive: true })
 

  return true
  } catch (error) {
    console.error(error);
    return false
  }
}

// Function ot get all category
const getAllCategories = async () => {
  try {
    const categories = await Category.find()
    return categories
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting categories: ${error.message}`)
  }
}

// Function ot get all category
const getAllSubcategories = async () => {
  try {
    const subcategories = await Subcategory.find()
    return subcategories
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting subcategories: ${error.message}`)
  }
}

// Function to validate category
const validateCategory = async name => {
  try {
    const exists = await Category.findOne({ name })
    if(exists) {
      return true
    } 
    return false
  } catch (error) {
    console.error(`Failed to validate category: ${error}`)
    return false
  }
}

// Function to validate category with id
const validateCategoryWithId = async _id => {
  try {
    const exists = await Category.findOne({ _id })
    if(exists) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(`Failed to validate category: ${error}`)
    return false
  }
}

// Get Category name with id
const getCategoryNameWithId = async id => {
  try {
    const name = await Category.findById(id).select("name -_id")
    return name.name
  } catch (error) {
    console.error(`Failed to get name: ${error}`);
    return false
  }
}



module.exports = {
    addCategory,
    disableCategory,
    enableCategory,
    getAllCategories,
    getAllSubcategories,
    validateCategory,
    validateCategoryWithId,
    getCategoryNameWithId,
    updateCategory
}