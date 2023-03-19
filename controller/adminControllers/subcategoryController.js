const { stringify } = require("querystring")
const { getSubcategoryWithId } = require("../../services/adminServices")
const { updateSubcategory, validateSubcategory, validateSubcategoryWithId, enableSubcategory, disableSubcategory, addSubcategory } = require("../../services/AdminServices/subcategoryServices")

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

// Render subcategory add page
const renderSubcategoryAdd = (req, res) => {
  try {
    const { name } = req.session
    const { message } = req.query
    res.render("admin/subcategoryAdd", { name, title: "Subcategory Add", message })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error rendering subcategory add: ${error.message}`)
  }
}

// Controller to edit category
const subcategoryEdit = async (req, res) => {
  try {
    let { subcategoryName, id } = req.body
    await updateSubcategory(id, subcategoryName)
    const statusObject = {
      message: `Subcategory updated successfully: ${subcategoryName}.`,
      success: true
    }
    return res.json(statusObject)
  } catch (error) {
    console.error(error)
    return res.status(500).send(`Error adding category: ${error.message}`)
  }
}

// Controller to add a new subcategory
const subcategoryAdd = async (req, res) => {
  try {
    let { subcategoryName } = req.body
    subcategoryName = subcategoryName.toLowerCase()
    const checkSubcategoryExist = await validateSubcategory(subcategoryName)
    if (checkSubcategoryExist) {
      const statusObject = {
        message: `Subcategory already exists: ${subcategoryName}`,
      }
      const statusString = stringify(statusObject)
      return res.redirect("back?" + statusString)
    }
    await addSubcategory(subcategoryName)
    const statusObject = {
      message: `Subcategory added successfully: ${subcategoryName}.`
    }
    const referrer = req.headers.referer || '/'
    const statusString = stringify(statusObject)
    return res.redirect(referrer + "?" + statusString);

  } catch (error) {
    console.error(error)
    return res.status(500).send(`Error adding subcategory: ${error.message}`)
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
  renderSubcategoryAdd,
  subcategoryEdit,
  subcategoryEnable,
  subcategoryDisable,
  subcategoryAdd
}