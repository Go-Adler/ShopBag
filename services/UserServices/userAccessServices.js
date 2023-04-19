import sgMail from '@sendgrid/mail'
import { config } from 'dotenv'

config({ path: "./services/userServices/sendgrid.env" })

// Sends an email containing an OTP verification code
export const sendOTPVerificationEmail = async (recipient, otp) => {
  try {
    const sendgridApiKey = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(sendgridApiKey)
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
    console.error(`Error in send otp verification email: ${error.message}`)
    throw new Error(`Error in send otp verification email: ${error}`)
  }
} 