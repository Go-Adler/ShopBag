// const { setApiKey, send } = require("@sendgrid/mail")
const { config } = require("dotenv")
const { resolve } = require("path")

config({ path: resolve(__dirname, "./sendgrid.env") })

// // Sends an email containing an OTP verification code
// const sendOTPVerificationEmail = async (recipient, otp) => {
//   try {
//     const sendgridApiKey = process.env.SENDGRID_API_KEY
//     console.log(sendgridApiKey);
//     setApiKey(sendgridApiKey)
//     console.log(recipient, 'recipient');
//     const message = {
//       to: recipient,
//       from: "gokul_adler@outlook.com",
//       subject: "OTP verification from Shop Bag",
//       text: "This is from Shop Bag",
//       html: `<span style="font-size: 24px; font-weight: bold;">${otp}</span>`,
//     }
//     await send(message)
//     return true
//   } catch (error) {
//     console.log(error);
//     console.error(`Error sending email: ${error.message}`)
//     return false
//   }
// } 

// module.exports = { sendOTPVerificationEmail }

const sendOTPVerificationEmail = async (recipient, otp) => {
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY, 'api')
console.log(process.env.SENDGRID_API_KEY);
console.log(recipient, 'rec');
const msg = {
  to: recipient, // Change to your recipient
  from: 'gokul_adler@outlook.com', // Change to your verified sender
  subject: `${otp}Sending with SendGrid is Fun,`,
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
// await sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//     return true
//   })
//   .catch((error) => {
//     console.error(error)
//   })
  await sgMail.send(msg)
      return true
}
  module.exports =  {sendOTPVerificationEmail}

