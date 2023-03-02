const sgMail = require('@sendgrid/mail');
const sendgridApiKey = require('../../sendgrid.env');

sgMail.setApiKey(sendgridApiKey);

const OTPVerification = async (mail, otp) => {
  try {
    const msg = {
      to: mail,
      from: 'gokul_adler@outlook.com',
      subject: 'OTP verification from Shop Bag',
      text: 'This is from Shop Bag',
      html: `<strong>Your OTP is <h1>${otp}</h1></strong>`
    };
    await sgMail.send(msg);
    return true
  } catch (error) {
    console.error(error);
    return false
  }
};

module.exports = OTPVerification;