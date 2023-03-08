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
module.exports = {
  getCategory,
  getSubcategory
}