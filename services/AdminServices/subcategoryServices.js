import { Subcategory } from '../../models/adminModel/categoryModel.js'

// Function to edit category
export const updateSubcategory = async (id, name) => {
  try {
    await Subcategory.findByIdAndUpdate(id, { name })
    return true
  } catch (error) {
    console.error(`Error in update subcategory: ${error.message}`)
    throw new Error(`Error in update subcategory: ${error}`)
  }
}

// Function to validate subcategory
export const validateSubcategory = async (name, category) => {
  try {
    const exists = await Subcategory.findOne({ name, category })
    if (exists) {
      return true
    }
    return false
  } catch (error) {
    console.error(`Error in validate subcategory: ${error.message}`)
    throw new Error(`Error in validate subcategory: ${error}`)
  }
}

// Function to validate subcategory with id
export const validateSubcategoryWithId = async (id) => {
  try {
    const exists = await Subcategory.findById(id)
    if (exists) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(`Error in validate subcategory with id: ${error.message}`)
    throw new Error(`Error in validate subcategory with id: ${error}`)
  }
}

// Funtion to enable subcategory
export const enableSubcategory = async (id) => {
  try {
    await Subcategory.findByIdAndUpdate(id, { isActive: true })
    return true
  } catch (error) {
    console.error(`Error in enable subcategory: ${error.message}`)
    throw new Error(`Error in enable subcategory: ${error}`)
  }
}

// Funtion to enable subcategory
export const disableSubcategory = async (id) => {
  try {
    await Subcategory.findByIdAndUpdate(id, { isActive: false })
    return true
  } catch (error) {
    console.error(`Error in disable subcategory: ${error.message}`)
    throw new Error(`Error in disable subcategory: ${error}`)
  }
}

// Function to add category
export const addSubcategory = async (name, category) => {
  try {
    await Subcategory.create({ name, category })
    return true
  } catch (error) {
    console.error(`Error in add subcategory: ${error.message}`)
    throw new Error(`Error in add subcategory: ${error}`)
  }
}