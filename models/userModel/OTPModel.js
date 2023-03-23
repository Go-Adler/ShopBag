import mongoose from 'mongoose'

const OTPSchema = new mongoose.Schema({
  OTP: Number,
})

export const OTP = mongoose.model('OTP', OTPSchema)
