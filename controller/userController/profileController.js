const { getAllCategories } = require("../../services/AdminServices/productsServices");
const { addressAdd } = require("../../services/UserServices/profileServices")


// Render profile page
const renderAddressAddPage = async (req, res) => {
  try {
    const { name } = req.session
    const categories = await getAllCategories()

    res.render("user/addAddress", { name, title: 'Profile Page User', categories });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error rendering add address page: ${error.message}`);
  }
};

// Render profile page
const addAddress = async (req, res) => {
  try {
    
    const { name, _id } = req.session
    const categories = await getAllCategories()
    await addressAdd(_id, req.body)

    res.render("user/addAddress", { name, title: 'Profile Page User', categories, message: "Address added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error rendering add address page: ${error.message}`);
  }
};

module.exports = {
  renderAddressAddPage,
  addAddress
}