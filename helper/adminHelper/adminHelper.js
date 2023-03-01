const model = require("../../models/userModel");
const CategoryModel = require("../../models/adminModel/categoryModel")
const db = require("../../config/mongoose")

db()

const userData = async () => {
  const userData = await model.user.find();
  return userData ? userData : false;
};
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