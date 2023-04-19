import { hashPassword } from '../../helper/passwordHelper.js'
import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Insert new user data into database
export const createUser = async (data) => {
  try {
    const { name, email, gender, phone, password } = data
    const hashedPassword = await hashPassword(password)

    await User.create({
      name,
      email,
      gender,
      phone,
      password: hashedPassword,
    })
    return true
  } catch (error) {
    console.error(`Error in create user: ${error.message}`)
    throw new Error(`Error in create user: ${error}`)
  }
}