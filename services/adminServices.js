import { Category, Subcategory } from '../models/adminModel/categoryModel'
import { mongo } from '../config/mongoose'

mongo()

// Function to fetch all category
export const getCategory = async () => {
  try {
    const category = await Category.find()
    return category || false
  } catch (error) {
    console.error(`Failed to get category from db: ${error}`)
    return false
  }
}

// Function to fetch all category
export const getSubcategory = async () => {
  try {
    const subcategory = await Subcategory.find()
    return subcategory || false
  } catch (error) {
    console.error(`Failed to get subcategory from db: ${error}`)
    return false
  }
}

// Function to fetch category with id
export const getCategoryWithId = async (id) => {
  try {
    const category = await Category.findById(id)
    return category || false
  } catch (error) {
    console.error(`Failed to get category: ${error}`)
    return false
  }
}

// Function to fetch category with id
export const getSubcategoryWithId = async (id) => {
  try {
    const subcategory = await Subcategory.findById(id)
    return subcategory || false
  } catch (error) {
    console.error(`Failed to get subcategory: ${error}`)
    return false
  }
}