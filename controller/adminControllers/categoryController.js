const { addCategory, addSubcategory, disableCategory, disableSubcategory, enableCategory, enableSubcategory } = require("../../services/AdminServices/categoryServices");

// Add
// Controller to add a new category
const categoryAdd = async (req, res) => {
  try {
    const { categoryName } = req.body

    await addCategory(categoryName);

    res.redirect("back")
    // res.render("admin/category", { success, categoryName, action: 'added', type: 'Category', name, category, subcategory});
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

// Controller to add a new subcategory
const subcategoryAdd = async (req, res) => {
  try {
    const { subcategoryName, categoryId } = req.body

    await addSubcategory( subcategoryName, categoryId);
    res.redirect("back")
    // res.render("admin/category", { success, categoryName, action: 'added', type: 'Subcategory', name, category, subcategory});
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

// Disable
// Controller to disable category
const categoryDisable = async (req, res) => {
  try {
    const { categoryId } = req.body;

    await disableCategory(categoryId);

      return res.redirect("back");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

// Controller to disable subcategory
const subcategoryDisable = async (req, res) => {
  try {
    const { categoryId } =  req.body
    const success = await disableSubcategory(categoryId);

    if (success) {
      res.redirect("back");
    }

  } catch (error) {
    console.error(error);
  }
};

// Enable
// Controller to enable category
const categoryEnable = async (req, res) => {
  try {
    const { categoryId } = req.body;

    await enableCategory(categoryId);

    return res.redirect("back");

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

// Controller to enable subcategory
const subcategoryEnable = async (req, res) => {
  try {
    const { categoryId } = req.body
    await enableSubcategory(categoryId);

    res.redirect("back");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  categoryAdd,
  subcategoryAdd,
  categoryDisable,
  subcategoryDisable,
  enableSubcategory,
  categoryEnable,
  subcategoryEnable
};
