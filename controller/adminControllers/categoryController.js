const categoryServices = require("../../services/AdminServices/categoryServices");

const categoryAdd = async (req, res) => {
  try {
    const { adminId } = req.session;

    if (!adminId) {
      return res.redirect("/admin/signin");
    }

    const { categoryName } = req.body
    const success = await categoryServices.addCategory(categoryName);

    if (success) {
      return res.redirect("back");
    }

    return res.status(400).send("Failed to add category");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const subCategoryAdd = async (req, res) => {
  try {
    const { adminId } = req.session;

    if (!adminId) {
      return res.redirect("/admin/signin");
    }

    const { subCategoryName, categoryId } = req.body

    const addedSubCategory = await categoryServices.addSubCategory( subCategoryName, categoryId);

    if (addedSubCategory) {
      return res.redirect("back");
    }

    return res.status(400).send("Failed to add subcategory");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const enableCategory = async (req, res) => {
  try {
    const { adminId } = req.session;

    if (!adminId) {
      return res.redirect("/admin/signin");
    }

    const { categoryId } = req.body;
    const success = await categoryServices.enableCategory(categoryId);

    if (success) {
      return res.redirect("back");
    }

    return res.status(400).send("Failed to enable category");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const disableCategory = async (req, res) => {
  try {
    const { adminId } = req.session;

    if (!adminId) {
      return res.redirect("/admin/signin");
    }

    const { categoryId } = req.body;
    const success = await categoryServices.disableCategory(categoryId);

    if (success) {
      return res.redirect("back");
    }

    return res.status(400).send("Failed to disable category");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const disableSubCategory = async (req, res) => {
  try {
    const { adminId } = req.session;

    if (!adminId) {
      return res.redirect("/admin/signin");
    }

    const { categoryId } =  req.body
    const success = await categoryServices.disableSubCategory(categoryId);

    if (success) {
      res.redirect("back");
    }

  } catch (error) {
    console.error(error);
  }
};

const enableSubCategory = async (req, res) => {
  try {
    const { adminId } = req.session;

    if (!adminId) {
      return res.redirect("/admin/signin");
    }

    const { categoryId } = req.body
    const disableCategory = await categoryServices.enableSubCategory(categoryId);

    if (disableCategory) {
      res.redirect("back");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  categoryAdd,
  subCategoryAdd,
  disableCategory,
  enableCategory,
  disableSubCategory,
  enableSubCategory
};
