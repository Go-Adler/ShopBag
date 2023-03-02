const mongoose = require("mongoose")

const OTPSchema = new mongoose.Schema({
  OTP: Number
})

const OTP = mongoose.model("OTP", OTPSchema)

module.exports = {
  OTP
}