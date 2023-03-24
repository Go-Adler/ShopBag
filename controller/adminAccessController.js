import { getUserDataWithEmail, getNameWithId } from "../services/userServices/dataServices.js"
import { comparePassword } from "../helper/passwordHelper.js"

// Function to validate sign in for admin
export const signInValidate = async (req, res) => {
  try {
    const { email, password } = req.body

    // Get admin data from data base using email
    const adminData = await getUserDataWithEmail(email)
    const { isAdmin, _id } = adminData
    if (!adminData) {
      throw new Error(
        "We think you are not an admin? You wanna apply for this role?"
      )
    }

    if (!isAdmin) {
      throw new Error("This email id is registered as user")
    }

    const passwordMatch = await comparePassword(password, email)

    if (!passwordMatch) {
      throw new Error("Invalid password")
    }

    const name = await getNameWithId(_id)
    req.session._id = _id
    req.session.name = name
    req.session.admin = true
    res.redirect("home")
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    res.render("admin/adminSignIn", { message: error.message })
  }
}