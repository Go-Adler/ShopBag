import { checkUserStatus} from '../services/UserServices/dataServices.js'

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
      message: 'Error in validating user',
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
      message: 'Error in validate user',
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
      message: 'Error in validate user status',
      previousPage: req.headers.referer,
    })
  }
}



// Middleware function to handle invalid urls
export const errorHandler1 = async (req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
}

// Middleware function to handle invalid urls
export const errorHandler2 = async (error, req, res, next) => {
  try {
    res.status(error.status || 500);
    res.render('error', {
    message: error.message,
    previousPage: '/user/signin/',
  });
  } catch (err) {
    res.render('error', {
      message: err.message,
      previousPage: '/user/signin/',
    })
  }
}