const { stringify } = require("querystring")
const {
  validateCategoryWithId,
  validateSubcategoryWithId,
  validateSubcategory,
  validateCategory,
  addCategory,
  addSubcategory,
  disableCategory,
  disableSubcategory,
  enableCategory,
  enableSubcategory,
} = require("../../services/AdminServices/categoryServices")

// Add
// Controller to add a new category
const categoryAdd = async (req, res) => {
  try {
    let { categoryName } = req.body
    categoryName = categoryName.toLowerCase()
    const checkCategoryExist = await validateCategory(categoryName)
    const styledCategoryName =
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    if (checkCategoryExist) {
      const statusObject = {
        error: true,
        message: `${styledCategoryName} already exists in category`,
      }
      const statusString = stringify(statusObject)
      return res.redirect("/admin/category?" + statusString)
    }
    await addCategory(categoryName)
    const statusObject = {
      message: `${styledCategoryName} added to category`,
    }
    const statusString = stringify(statusObject)
    return res.redirect("/admin/category?" + statusString)
  } catch (error) {
    console.error(error)
    return res.status(500).send(`Error adding category: ${error.message}`)
  }
}

// Controller to add a new subcategory
const subcategoryAdd = async (req, res) => {
  try {
    let { subcategoryName, categoryId } = req.body
    subcategoryName = subcategoryName.toLowerCase()

    // Check subactegory exists or not
    const checkSubcategoryExist = await validateSubcategory(subcategoryName)
    const styledSubcategoryName =
      subcategoryName.charAt(0).toUpperCase() + subcategoryName.slice(1)
    if (checkSubcategoryExist) {
      const statusObject = {
        error: true,
        message: `${styledSubcategoryName} already exists in subcategory`,
      }
      const statusString = stringify(statusObject)
      return res.redirect("/admin/category?" + statusString)
    }

    // Add new subcategory
    await addSubcategory(subcategoryName, categoryId)

    const statusObject = {
      message: `${styledSubcategoryName} added to subcategory`,
    }
    const statusString = stringify(statusObject)
    return res.redirect("/admin/category?" + statusString)
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
}

// Disable
// Controller to disable category
const categoryDisable = async (req, res) => {
  try {
    const { categoryId } = req.body

    console.log(categoryId);

    const checkCategoryExist = await validateCategoryWithId(categoryId)
    
    if (!checkCategoryExist) {
      const statusObject = {
        message: "Category not exists",
      }
      const statusString = stringify(statusObject)
      return res.redirect("/admin/category?" + statusString)
    }
    await disableCategory(categoryId)

    return res.status(400)
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
}

// Controller to disable subcategory
const subcategoryDisable = async (req, res) => {
  try {
    const { categoryId } = req.body

    const checkSubcategoryExist = await validateSubcategoryWithId(categoryId)
    
    if (!checkSubcategoryExist) {
      const statusObject = {
        message: "Subcategory not exists",
      }
      const statusString = stringify(statusObject)
      return res.redirect("/admin/category?" + statusString)
    }
    await disableSubcategory(categoryId)

    const statusObject = {
      message: "Subcategory disabled",
    }
    const statusString = stringify(statusObject)
    return res.redirect("/admin/category?" + statusString)
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
}

// Enable
// Controller to enable category
const categoryEnable = async (req, res) => {
  try {
    const { categoryId } = req.body

    const checkCategoryExist = await validateCategoryWithId(categoryId)
    
    if (!checkCategoryExist) {
      const statusObject = {
        message: "Category not exists",
      }
      const statusString = stringify(statusObject)
      return res.redirect("/admin/category?" + statusString)
    }
    await enableCategory(categoryId)

    const statusObject = {
      message: "Category enabled",
    }
    const statusString = stringify(statusObject)
    return res.redirect("/admin/category?" + statusString)
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
}

// Controller to enable subcategory
const subcategoryEnable = async (req, res) => {
  try {
    const { categoryId } = req.body

    const checkSubcategoryExist = await validateSubcategoryWithId(categoryId)
    
    if (!checkSubcategoryExist) {
      const statusObject = {
        message: "Subcategory not exists",
      }
      const statusString = stringify(statusObject)
      return res.redirect("/admin/category?" + statusString)
    }
    await enableSubcategory(categoryId)

    const statusObject = {
      message: "Subcategory enabled",
    }
    const statusString = stringify(statusObject)
    return res.redirect("/admin/category?" + statusString)
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
}

module.exports = {
  categoryAdd,
  subcategoryAdd,
  categoryDisable,
  subcategoryDisable,
  enableSubcategory,
  categoryEnable,
  subcategoryEnable,
}
