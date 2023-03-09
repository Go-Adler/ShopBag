const { checkUserStatus } = require("../services/UserServices/dataServices")

// Middleware function to validate sign-out
const validateSignOut = (req, res, next) => {
  const isAdmin = req.originalUrl.includes('/admin');
  if (!req.session._id) {
    return res.status(401).redirect(isAdmin ? '/admin/signin' : '/user/signin');
  }
  next();
}


// Middleware function to validate sign in
const validateSignIn = (req, res, next) =>  {
  if (req.session._id) {
    if (req.session.admin) {
      return res.redirect("/admin/home");
    } else {
      return res.redirect("/user/home");
    }
  }
  next();
}

// Middleware function to validate user enable or disabled
const validateUserStats = async (req, res, next) =>  {
  const id = req.session._id
  const status = await checkUserStatus(id)
    if (status) {
      return res.redirect("/user/logout");
    } else {
      next()
    }
}

// Middleware function to destroy the session
const destroySession = async (req, res, next) => {
  try {
    // Destroy the session
    await req.session.destroy();

    console.log('Session destroyed successfully');
    
    // Redirect to appropriate login page based on isAdmin flag
    const isAdmin = req.originalUrl.includes('/admin');
    return res.redirect(isAdmin ? '/admin/signin' : '/user/signin');
  } catch (error) {
    console.error(`Error destroying session: ${error}`);
  }
}

module.exports = {
  validateSignIn,
  validateSignOut,
  destroySession,
  validateUserStats
}
