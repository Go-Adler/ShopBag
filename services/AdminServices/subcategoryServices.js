const { Subcategory } = require("../../models/adminModel/categoryModel")

// Function to edit category
const updateSubcategory = async (id, name) => {
  try {
    await Subcategory.findByIdAndUpdate(id, { name })
    return true
  } catch (error) {
    console.error(`Failed to update subcategory: ${error}`)
    return false
  }
}

// Function to validate subcategory
const validateSubcategory = async (name) => {
  try {
    const exists = await Subcategory.findOne({ name })
    if (exists) {
      return true
    }
    return false
  } catch (error) {
    console.error(`Failed to validate subcategory: ${error}`)
    return false
  }
}

// Function to validate subcategory with id
const validateSubcategoryWithId = async (id) => {
  try {
    const exists = await Subcategory.findById(id)
    if (exists) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(`Failed to validate subcategory: ${error}`)
    return false
  }
}

// Funtion to enable subcategory
const enableSubcategory = async (id) => {
  try {
    await Subcategory.findByIdAndUpdate(id, { isActive: true })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// Funtion to enable subcategory
const disableSubcategory = async (id) => {
  try {
    await Subcategory.findByIdAndUpdate(id, { isActive: false })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// Function to add category
const addSubcategory = async name => {
  try {
    await Subcategory.create({ name })
    return true
  } catch (error) {
    console.error(`Failed to create subcategory: ${error}`)
    return false
  }
}

module.exports = {
  updateSubcategory,
  validateSubcategory,
  validateSubcategoryWithId,
  enableSubcategory,
  disableSubcategory,
  addSubcategory
}
