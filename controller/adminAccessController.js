const { getUserDataWithEmail } = require("../services/UserServices/dataServices")
const passwordHelper = require("../helper/passwordHelper")

// Function to validate sign in for admin
const signInValidate = async (req, res) => {
  try {
    const { email, password } = req.body

    // Get admin data from data base using email
    const adminData = await getUserDataWithEmail(email);

    if (!adminData) {
      throw new Error(
        "We think you are not an admin? You wanna apply for this role?"
      );
    }

    if (!adminData.isAdmin) {
      throw new Error("This email id is registered as user");
    }

    const passwordMatch = await passwordHelper.comparePassword(password, email)

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const name = await verify.getName(email)
    req.session._Id = adminData._id;
    req.session.name = name
    res.redirect("home")
  } catch (error) {
    res.render("admin/adminSignIn", { message: error.message });
  }
}

module.exports = {
  signInValidate
}