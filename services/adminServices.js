import { Category, Subcategory } from '../models/adminModel/categoryModel.js'
import { mongo } from '../config/mongoose.js'

mongo()

// Function to fetch all category
export const getCategory = async () => {
  try {
    const category = await Category.find()
    return category || false
  } catch (error) {
    console.error(`Error in get category: ${error.message}`)
    throw new Error(`Error in get category: ${error}`)
  }
}

// Function to fetch all category
export const getSubcategory = async () => {
  try {
    const subcategory = await Subcategory.find()
    return subcategory || false
  } catch (error) {
    console.error(`Error in get subcategory: ${error.message}`)
    throw new Error(`Error in get subcategory: ${error}`)
  }
}

// Function to fetch category with id
export const getCategoryWithId = async (id) => {
  try {
    const category = await Category.findById(id)
    return category || false
  } catch (error) {
    console.error(`Error in get category with id: ${error.message}`)
    throw new Error(`Error in get category with id: ${error}`)
  }
}

// Function to fetch category with id
export const getSubcategoryWithId = async (id) => {
  try {
    const subcategory = await Subcategory.findById(id)
    return subcategory || false
  } catch (error) {
    console.error(`Error in get subcategory with id: ${error.message}`)
    throw new Error(`Error in get subcategory with id: ${error}`)
  }
}