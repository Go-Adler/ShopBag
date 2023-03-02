const db = require("../../config/mongoose")
const CategoryModel = require("../../models/adminModel/categoryModel")

db()

const addCategory = async name => {
  try {
    await CategoryModel.Category.create({ name, isActive: true })
    return true
  } catch (error) {
    console.error(`Failed to create category: ${error}`)
    return false
  }
}

const addSubCategory = async (name, category) => {
  try {
    await CategoryModel.SubCategory.create({ name, category, isActive: true })
    return true
  } catch (error) {
    console.error(`Failed to create subCategory: ${error}`)
    return false
  }
}

const enableCategory = async _id => {
  try {
  await CategoryModel.Category.findOneAndUpdate({ _id }, { isActive: true })
  return true
  } catch (error) {
    console.error(error);
    return false
  }
}

const disableCategory = async _id => {
  try {
  await CategoryModel.Category.findOneAndUpdate({ _id }, { isActive: false })
  return true
  } catch (error) {
    console.error(error);
    return false
  }
}

const enableSubCategory = async _id => {
  try {
  await CategoryModel.SubCategory.findOneAndUpdate({ _id }, { isActive: true })
  return true
  } catch (error) {
    console.error(error);
    return false
  }
}

const disableSubCategory = async _id => {
  try {
  await CategoryModel.SubCategory.findOneAndUpdate({ _id }, { isActive: false })
  return true
  } catch (error) {
    console.error(error);
    return false
  }
}

module.exports = {
   addCategory,
   addSubCategory,
   enableCategory,
   disableCategory,
   enableSubCategory,
   disableSubCategory
}