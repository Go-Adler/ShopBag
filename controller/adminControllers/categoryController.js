const categoryServices = require("../../services/AdminServices/categoryServices");

const categoryAdd = async (req, res) => {
  if (req.session && req.session.adminEmail) {
    try {
      const addCategory = await categoryServices.addCategory(
        req.body.categoryName
      );
      if (addCategory) {
        res.redirect("back");
      } else {
        res.status(400).send("Failed to add category");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("/admin/signin");
  }
};

const subCategoryAdd = async (req, res) => {
  if (req.session && req.session.adminEmail) {
    try {
      const addCategory = await categoryServices.addSubCategory(
        req.body
      );
      if (addCategory) {
        res.redirect("back");
      } else {
        res.status(400).send("Failed to add category");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("/admin/signin");
  }
};

const enableCategory = async (req, res) => {
  try {
    const enableCategory = await categoryServices.enableCategory(req.body.categoryId);
    if (enableCategory) {
      res.redirect("back");
    }
  } catch (err) {
    console.error(err);
  }
};

const disableCategory = async (req, res) => {
  try {
    const disableCategory = await categoryServices.disableCategory(req.body.categoryId);
    if (disableCategory) {
      res.redirect("back");
    }
  } catch (err) {
    console.error(err);
  }
};

const disableSubCategory = async (req, res) => {
  try {
    const disableCategory = await categoryServices.disableSubCategory(req.body.categoryId);
    if (disableCategory) {
      res.redirect("back");
    }
  } catch (err) {
    console.error(err);
  }
};

const enableSubCategory = async (req, res) => {
  try {
    const disableCategory = await categoryServices.enableSubCategory(req.body.categoryId);
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
