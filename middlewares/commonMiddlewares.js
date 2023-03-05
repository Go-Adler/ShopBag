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
      return res.redirect("/admin/profile");
    } else {
      return res.redirect("/user/profile");
    }
  }
  next();
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
  destroySession
}
