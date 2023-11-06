import { comparePassword, hashPassword } from '../helper/passwordHelper.js'
import { sendOTPVerificationEmail } from '../services/UserServices/userAccessServices.js'
import { generateRandomNumber } from '../helper/userHelper/randomNumber.js'
import { createUser } from '../services/UserServices/insertData.js'

import { changePassword, getUserDataWithEmail, checkUserByEmail, checkUserByPhone } from '../services/UserServices/dataServices.js'

// Function to handle otp verification
export const handleOTPVerification = async (req, res) => {
  try {
    const { otp } = req.session
    const { otpEntered } = req.body

    if (otp == otpEntered) {
      const { userData } = req.session
      await createUser(userData)
      req.session.name = userData.name
      res.redirect('otpVerified')
    }

    res.render('user/OTPVerification', {
      message: 'Invalid OTP. Please try again.',
    })
  } catch (error) {
    console.error(`Error rendering otp verification: ${error.message}`)
    res.render('error', {
      message: 'Error in otp verification',
      previousPage: req.headers.referer,
    })
  }
}

// Function to handle otp verification for forgot password
export const handleOTPVerificationForgotPassword = async (req, res) => {
  try {
    const { otp } = req.session
    const { otpEntered } = req.body

    if (otp == otpEntered) res.redirect('change-password')

    res.render('user/OTPVerificationForgotPassword', {
      message: 'Invalid OTP. Please try again.',
    })
  } catch (error) {
    console.error(
      `Error while handling otp verification of forgot password: ${error.message}`
    )
    res.render('error', {
      message: 'Error in otp verification',
      previousPage: req.headers.referer,
    })
  }
}

// Function to validate user sign-in
export const validateUserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body

    let errorMessage

    // Get user data with email
    const userData = await getUserDataWithEmail(email)

    // Checks if user data exists in the database
    if (!userData) errorMessage = 'This email id is new to us, wanna sign up?'

    // Extract necessary data from user object
    const { isAdmin, isBlocked, name, _id } = userData

    // Checks if user is an admin
    if (isAdmin) errorMessage = 'This email id is registered as admin'

    // Checks if the user is blocked
    if (isBlocked) errorMessage = 'Sorry the user is blocked'

    // Checks if the password is correct
    if (userData) {
      const passwordMatch = await comparePassword(password, email)
      if (!passwordMatch) errorMessage = 'Invalid password'
    }

    if (errorMessage) return res.render('user/userSignIn', { errorMessage })

    // Set session variables
    req.session._id = _id
    req.session.name = name
    req.session.admin = false
    res.redirect('home')
  } catch (error) {
    console.error(`Error validating user sign in : ${error.message}`)
    res.render('error', {
      message: 'Error in user sign in',
      previousPage: req.headers.referer,
    })
  }
}

// Function to validate user sign-up
export const validateUserSignUp = async (req, res) => {
  try {
    // Extract phone and email from request body
    const { phone, email } = req.body
    let errorMessage, isOtpSent, otpCode

    // Check if email and phone number already exist in the database
    const isEmailTaken = await checkUserByEmail(email)
    const isPhoneTaken = await checkUserByPhone(phone)

    if (isEmailTaken && isPhoneTaken) {
      errorMessage = `Both the email ${email} and the phone number ${phone} already exist.`
    } else if (isEmailTaken) {
      errorMessage = `The email ${email} already exists.`
    } else if (isPhoneTaken) {
      errorMessage = `The phone number ${phone} already exists.`
    }

    // Generate a random number and send an OTP verification email to the user's email
    if (!errorMessage && !isEmailTaken && !isPhoneTaken) {
      otpCode = generateRandomNumber()
      isOtpSent = await sendOTPVerificationEmail(email, otpCode)
      if (!isOtpSent) errorMessage = 'Error sending OTP'
    }

    // If OTP sending fails, throw an error

    if (errorMessage) return res.render('user/userSignUp', { errorMessage })

    // Save user data and OTP code in session and redirect to OTP verification page
    req.session.userData = req.body
    req.session.otp = otpCode
    res.redirect('OTPVerification')
  } catch (error) {
    console.error(`Error in validating user sign up #validateUserSignUpController: ${error.message}`)
    res.render('error', {
      message: 'Error in user sign up',
      previousPage: req.headers.referer,
    })
  }
}

// Function to validate email from forgot password before sign in
export const validateUserEmailForgotPassword = async (req, res) => {
  try {
    // Extract phone and email from request body
    const { email } = req.body

    // Check if email and phone number already exist in the database
    const EmailExists = await checkUserByEmail(email)

    // If email already exists, throw an error
    if (!EmailExists) throw new Error(`The email ${email} not exists.`)

    // Generate a random number and send an OTP verification email to the user's email
    const otpCode = generateRandomNumber()
    // const isOtpSent = await sendOTPVerificationEmail(email, otpCode)

    // If OTP sending fails, throw an error
    // if (!isOtpSent) throw new Error('Error sending OTP')
    console.log(otpCode, 160);

    // Save user data and OTP code in session and redirect to OTP verification page
    req.session.otp = otpCode
    req.session.email = email
    res.redirect('OTPVerificationForgotPassword')
  } catch (error) {
    // Render user sign-up page with error message
    res.render('user/forgotPassword', {
      message: error.message,
      success: false,
    })
  }
}

// Function to resend otp
export const resendOTP = async (req, res) => {
  let { email } = req.session
  try {
    let { email } = req.session
    // Generate a random number and send an OTP verification email to the user's email
    const otpCode = generateRandomNumber()
    const isOtpSent = await sendOTPVerificationEmail(email, otpCode)

    // If OTP sending fails, throw an error
    if (!isOtpSent) throw new Error('Error sending OTP')

    // Save user data and OTP code in session and redirect to OTP verification page
    req.session.otp = otpCode
    res.redirect('OTPVerificationForgotPassword')
  } catch (error) {
    req.session.email = email
    // Render user sign-up page with error message
    res.render('user/OTPVerificationForgotPassword', {
      message: error.message,
      success: false,
    })
  }
}

// Function to handle password change
export const handleChangePassword = async (req, res) => {
  try {
    const { password } = req.body
    const { email } = req.session
    const hashedPassword = await hashPassword(password)
    await changePassword(email, hashedPassword)

    res.render('user/OTPVerified', {
      message: 'Your password is changed, now you can log in.',
    })
  } catch (error) {
    console.error(`Error changing password: ${error.message}`)
    return res.render('user/OTPVerificationForgotPasswod', {
      message: 'Error changing password. Please try again.',
    })
  }
}

// Middleware function to destroy the session
export const logout = async (req, res) => {
  try {
    // Destroy the session
    await req.session.destroy()

    // Redirect to appropriate login page based on isAdmin flag
    const isAdmin = req.originalUrl.includes('/admin')
    return res.redirect(isAdmin ? '/admin/signin' : '/user/signin')
  } catch (error) {
    console.error(`Error in session destruction: ${error.message}`)
    res.render('error', {
      message: 'Error in logout',
      previousPage: req.headers.referer,
    })
  }
}