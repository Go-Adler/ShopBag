const { setApiKey, send } = require("@sendgrid/mail")
const { config } = require("dotenv")

config()

// Sends an email containing an OTP verification code
const sendOTPVerificationEmail = async (recipient, otp) => {
  try {
    const sendgridApiKey = process.env.SENDGRID_API_KEY
    console.log(sendgridApiKey, 'api');
    setApiKey(sendgridApiKey)
    const message = {
      to: recipient,
      from: "gokul_adler@outlook.com",
      subject: "OTP verification from Shop Bag",
      text: "This is from Shop Bag",
      html: `<span style="font-size: 24px; font-weight: bold;">${otp}</span>`,
    }
    await send(message)
    return true
  } catch (error) {
    console.error(`Error sending email: ${error.message}`)
    return false
  }
} 

module.exports = { sendOTPVerificationEmail }
