const { User } = require("../models/userModel");
const CategoryModel = require("../models/adminModel/categoryModel")
const db = require("../config/mongoose")

db()

const categoryData = async () => {
  const categoryData = await CategoryModel.Category.find();
  return categoryData ? categoryData : false;
}

const subCategoryData = async () => {
  const categoryData = await CategoryModel.SubCategory.find();
  return categoryData ? categoryData : false;
}
module.exports = {
  userData,
  categoryData,
  subCategoryData
}