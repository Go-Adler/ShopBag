

// Render category edit page
const renderSubcategoryEdit = async (req, res) => {
  try {
    const { name } = req.session
    const { id } = req.params
    const subcategory = await getSubcategoryWithId(id)
    res.render("admin/subcategoryEdit", {
      name,
      title: "Subcategory Edit",
      subcategory
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error rendering subcategory edit: ${error.message}`)
  }
}