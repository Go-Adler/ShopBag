const { Category, Subcategory } = require("../models/adminModel/categoryModel")
const db = require("../config/mongoose")

db()

// Function to fetch all category
const getCategory = async () => {
  try {
    const category = await Category.find()
    return category || false
  } catch (error) {
    console.error(`Failed to get category from db: ${error}`)
    return false
  }
}

// Function to fetch all category
const getSubcategory = async () => {
  try {
    const subcategory = await Subcategory.find()
    return subcategory || false
  } catch (error) {
    console.error(`Failed to get subcategory from db: ${error}`)
    return false  
  }
}

// Function to fetch category with id
const getCategoryWithId = async id => {
  try {
    const category = await Category.findById(id)
    return category || false
  } catch (error) {
    console.error(`Failed to get category: ${error}`)
    return false  
  }
}

// Function to fetch category with id
const getSubcategoryWithId = async id => {
  try {
    const subcategory = await Subcategory.findById(id)
    return subcategory || false
  } catch (error) {
    console.error(`Failed to get subcategory: ${error}`)
    return false  
  }
}

module.exports = {
  getCategory,
  getSubcategory,
  getCategoryWithId,
  getSubcategoryWithId
}