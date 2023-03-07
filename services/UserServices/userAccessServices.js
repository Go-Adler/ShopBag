const sgMail = require("@sendgrid/mail")
const { config } = require("dotenv")
const { resolve } = require("path")

config({ path: resolve(__dirname, "./sendgrid.env") })

// Sends an email containing an OTP verification code
const sendOTPVerificationEmail = async (recipient, otp) => {
  try {
    const sendgridApiKey = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(sendgridApiKey)
    console.log(recipient, 'recipient');
    const message = {
      to: recipient,
      from: "gokul_adler@outlook.com",
      subject: "OTP verification from Shop Bag",
      text: "This is from Shop Bag",
      html: `<span style="font-size: 24px; font-weight: bold;">${otp}</span>`,
    }
    await sgMail.send(message)
    return true
  } catch (error) {
    console.log(error);
    console.error(`Error sending email: ${error.message}`)
    return false
  }
} 

module.exports = { sendOTPVerificationEmail }