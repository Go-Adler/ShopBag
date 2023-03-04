// Middleware function to validate if user is signed out
const validateSessionSignOut = (req, res, next) =>  {
  // console.log(req.session);
  console.log(req.session);
  if (!req.session._id) {
    console.log('no session exist');
      res.status(401).redirect("/user/signin")
  }
  next();
}

// Middleware function to validate if user is signed out
const validateSessionSignOutAdmin = (req, res, next) =>  {
  // console.log(req.session);
  console.log(req.session);
  if (!req.session._id) {
    console.log('no session exist');
      res.status(401).redirect("/admin/signin")
  }
  next();
}

// Middleware function to validate if user is already signed in
const validateSessionSignIn = (req, res, next) =>  {
  // console.log(req.session);
  if (req.session._id) {
     res.redirect("/user/profile")
  }
  next();
}

// Middleware function to validate if user is already signed in
const validateSessionSignInAdmin = (req, res, next) =>  {
  // console.log(req.session);
  if (req.session._id) {
     res.redirect("/admin/profile")
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
  validateSessionSignInAdmin,
  validateSessionSignOutAdmin,
  destroySession
}
