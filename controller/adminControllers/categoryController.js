const { stringify } = require("querystring")
const {
  getCategoryWithId,
  getSubcategory,
} = require("../../services/adminServices")
const {
  validateCategoryWithId,
  validateCategory,
  addCategory,
  disableCategory,
  enableCategory,
  updateCategory,
} = require("../../services/AdminServices/categoryServices")

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
    console.error(`Error rendering category edit page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
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
    console.error(`Error in edit category: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}

module.exports = {
  categoryAdd,
  categoryDisable,
  categoryEnable,
  renderCategoryAdd,
  renderCategoryEdit,
  categoryEdit,
}
