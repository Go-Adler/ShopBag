const { stringify } = require("querystring")
const {
  getCategoryWithId,
  getSubcategory,
} = require("../../services/adminServices")

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
  updateCategory,
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
    console.error(`Error while adding category: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
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
    console.error(`Error while adding sucategory: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}

// Disable
// Controller to disable category
const categoryDisable = async (req, res) => {
  try {
    const { id } = req.body
    const checkCategoryExist = await validateCategoryWithId(id)

    if (!checkCategoryExist) {
      res.status(404).json({
        message: "Category not exists",
      })
    }
    await disableCategory(id)

    res.json({ success: true })
  } catch (error) {
    console.error(`Error while disabling category: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
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
    console.error(`Error while disabling subcategory: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}

// Enable
// Controller to enable category
const categoryEnable = async (req, res) => {
  try {
    const { id } = req.body

    const checkCategoryExist = await validateCategoryWithId(id)

    if (!checkCategoryExist) {
      res.status(404).json({ message: "Category does not exist" })
    }
    await enableCategory(id)
    res.json({ success: true })
  } catch (error) {
    console.error(`Error enabling category: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
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
    console.error(`Error enabling subcategory: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}

// Render category add page
const renderCategoryAdd = (req, res) => {
  try {
    const { name } = req.session
    res.render("admin/categoryAdd", { name, title: "Category Add" })
  } catch (error) {
    console.error(`Error rendering category: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}

// Render category edit page
const renderCategoryEdit = async (req, res) => {
  try {
    const { name } = req.session
    const { id } = req.params
    const category = await getCategoryWithId(id)
    const subcategory = await getSubcategory()
    res.render("admin/categoryEdit", {
      name,
      title: "Category Edit",
      category,
      subcategory
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error rendering category edit: ${error.message}`)
  }
}

// Controller to edit category
const categoryEdit = async (req, res) => {
  try {
    let { categoryName } = req.body
    let { id } = req.params
    await updateCategory(id, categoryName)
    const statusObject = {
      message: `Category updated successfully: ${categoryName}.`,
    }
    const statusString = stringify(statusObject)
    return res.redirect("/admin/category?" + statusString)
  } catch (error) {
    console.error(error)
    return res.status(500).send(`Error adding category: ${error.message}`)
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
  renderCategoryAdd,
  renderCategoryEdit,
  categoryEdit,
}
