const sgMail = require('@sendgrid/mail');
const sendgridApiKey = require('../../sendgrid.env');

sgMail.setApiKey(sendgridApiKey);

const OTPVerification = async (mail, otp) => {
  try {
    const msg = {
      to: mail,
      from: 'gokul_adler@outlook.com',
      subject: 'OTP verification from Shop Bank',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    await sgMail.send(msg);
    return true
  } catch (error) {
    console.error(error);
    return false
  }
};

module.exports = OTPVerification;