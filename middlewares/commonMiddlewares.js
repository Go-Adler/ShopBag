// Middleware function to validate if user is signed out
const validateSessionSignOut = (req, res, next) =>  {
  if (!req.session || !req.session._Id) {
      return res.status(401).redirect("sigin")
  }
  next();
}

// Middleware function to validate if user is already signed in
const validateSessionSignIn = (req, res, next) =>  {
  if (req.session || req.session._Id) {
     return res.redirect("profile")
  }
  next();
}

// Middleware function to destroy the session
const destroySession = async (req, res, next) => {
  try {
    // Destroying the session
   await req.session.destroy()

   console.log("Session destroyed successfully");
   return next()
  } catch (error) {
   console.error(`Error destroying session: ${error}`);
  }
}

module.exports = {
  validateSessionSignIn,
  validateSessionSignOut,
  destroySession
}
