const { stringify } = require("querystring")
const { getSubcategoryWithId } = require("../../services/adminServices")
const { updateSubcategory, validateSubcategory, validateSubcategoryWithId, enableSubcategory, disableSubcategory } = require("../../services/AdminServices/subcategoryServices")

// Render subcategory edit page
const renderSubcategoryEdit = async (req, res) => {
  try {
    const { name } = req.session
    const { id } = req.params
    const { message } = req.query
    const subcategory = await getSubcategoryWithId(id)
    res.render("admin/subcategoryEdit", {
      name,
      title: "Subcategory Edit",
    subcategory,
      message
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error rendering subcategory edit: ${error.message}`)
  }
}

// Controller to edit category
const subcategoryEdit = async (req, res) => {
  try {
    let { subcategoryName } = req.body
    let { id } = req.params
    await updateSubcategory(id, subcategoryName)
    const statusObject = {
      message: `Subcategory updated successfully: ${subcategoryName}.`,
    }
    const statusString = stringify(statusObject)
    return res.redirect("back?" + statusString)
  } catch (error) {
    console.error(error)
    return res.status(500).send(`Error adding category: ${error.message}`)
  }
}

// Controller to add a new subcategory
const subcategoryAdd = async (req, res) => {
  try {
    let { subcategoryName } = req.body
    subcategoryName = categoryName.toLowerCase()
    const checkSubcategoryExist = await validateSubcategory(subcategoryName)
    if (checkSubcategoryExist) {
      const statusObject = {
        message: `Subcategory already exists: ${subcategoryName}`,
      }
      const statusString = stringify(statusObject)
      return res.redirect("back?" + statusString)
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

// Controller to enable category
const subcategoryEnable = async (req, res) => {
  try {
    const { id } = req.body

    const checkSubcategoryExist = await validateSubcategoryWithId(id)

    if (!checkSubcategoryExist) {
      res.status(404).json({ message: "Subcategory does not exist" })
    }
    await enableSubcategory(id)
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
}

// Enable
// Controller to enable category
const subcategoryDisable = async (req, res) => {
  try {
    const { id } = req.body

    const checkSubcategoryExist = await validateSubcategoryWithId(id)

    if (!checkSubcategoryExist) {
      res.status(404).json({ message: "Subcategory does not exist" })
    }
    await disableSubcategory(id)
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
}


module.exports = {
  renderSubcategoryEdit,
  subcategoryEdit,
  subcategoryEnable,
  subcategoryDisable
}