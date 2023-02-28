const verify = require('../helper/userHelper/verifyData')

const signInLoad = (req, res) => {
  if(req.session && req.session.adminEmail) {
    res.redirect("profile")
  } else {
    res.render("admin/adminSignIn")
  }
}

const signInValidate = async (req, res) => {
  try {
    const userData = await verify.userData(req.body.email);

    if (!userData) {
      throw new Error(
        "We think you are not an admin? You wanna apply for this role?"
      );
    }

    if (!userData.isAdmin) {
      throw new Error("This email id is registered as user");
    }

    if (userData.password !== req.body.password) {
      throw new Error("Invalid password");
    }
    req.session.adminEmail = userData.email;
    res.redirect("home")
  } catch (err) {
    res.render("admin/adminSignIn", { message: err.message });
  }
}

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session");
    } else {
      console.log("Session destroyed successfully");
    }
  })
  res.redirect("signin")
}

module.exports = {
  signInLoad,
  signInValidate,
  logout
}