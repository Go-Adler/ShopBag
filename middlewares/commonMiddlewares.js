import { checkUserStatus } from '../services/userServices/dataServices.js'

// Middleware function to validate sign-out
export const validateSignOut = (req, res, next) => {
  try {
    const isAdmin = req.originalUrl.includes('/admin')
    if (!req.session._id) {
      return res
        .status(401)
        .redirect(isAdmin ? '/admin/signin' : '/user/signin')
    }
    next()
  } catch (error) {
    console.error(`Error in user signout validation: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Middleware function to validate sign in
export const validateSignIn = (req, res, next) => {
  try {
    if (req.session._id) {
      if (req.session.admin) {
        return res.redirect('/admin/home')
      } else {
        return res.redirect('/user/home')
      }
    }
    next()
  } catch (error) {
    console.error(`Error in user sign in validation: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Middleware function to validate user enable or disabled
export const validateUserStats = async (req, res, next) => {
  try {
    const id = req.session._id
    const status = await checkUserStatus(id)
    if (status) {
      return res.redirect('/user/logout')
    } else {
      next()
    }
  } catch (error) {
    console.error(`Error in user status validation: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Middleware function to destroy the session
export const destroySession = async (req, res) => {
  try {
    // Destroy the session
    await req.session.destroy()

    // Redirect to appropriate login page based on isAdmin flag
    const isAdmin = req.originalUrl.includes('/admin')
    return res.redirect(isAdmin ? '/admin/signin' : '/user/signin')
  } catch (error) {
    console.error(`Error in session destruction: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}
