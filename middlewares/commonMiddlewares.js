// Middleware function to validate if user is signed out
const validateSessionSignOut = (req, res, next) =>  {
  console.log(req.session);
  if (!req.session && !req.session._id) {
      res.status(401).redirect("signin")
  }
  next();
}

// Middleware function to validate if user is already signed in
const validateSessionSignIn = (req, res, next) =>  {
  console.log(req.session);
  if (req.session && req.session._id) {
     res.redirect("profile")
  }
  next();
}

// Middleware function to destroy the session
const destroySession = async (req, res, next) => {
  try {
    // Destroying the session
   await req.session.destroy()

   console.log("Session destroyed successfully");
   next()
  } catch (error) {
   console.error(`Error destroying session: ${error}`);
  }
}

module.exports = {
  validateSessionSignIn,
  validateSessionSignOut,
  destroySession
}
