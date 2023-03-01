const db = require("../../config/mongoose")
const CategoryModel = require("../../models/adminModel/categoryModel")

db()

const addCategory = async (categoryName) => {
  try {
    await CategoryModel.Category.create({ name: categoryName, isActive: 1 })
    return true
  } catch (error) {
    console.error(`Failed to create category: ${error}`)
    return false
  }
}

const addSubCategory = async (data) => {
  try {
    await CategoryModel.SubCategory.create({ name: data.subCategoryName, category: data.categoryId , isActive: 1 })
    return true
  } catch (error) {
    console.error(`Failed to create subCategory: ${error}`)
    return false
  }
}

const enableCategory = async (id) => {
  try {
  await CategoryModel.Category.findOneAndUpdate({ _id: id }, { isActive: 1 })
  return true
  } catch (err) {
    console.error(err);
    return false
  }
}

const disableCategory = async (id) => {
  try {
  await CategoryModel.Category.findOneAndUpdate({ _id: id }, { isActive: 0 })
  return true
  } catch (err) {
    console.error(err);
    return false
  }
}

const enableSubCategory = async (id) => {
  try {
  await CategoryModel.SubCategory.findOneAndUpdate({ _id: id }, { isActive: 1 })
  return true
  } catch (err) {
    console.error(err);
    return false
  }
}

const disableSubCategory = async (id) => {
  try {
  await CategoryModel.SubCategory.findOneAndUpdate({ _id: id }, { isActive: 0 })
  return true
  } catch (err) {
    console.error(err);
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