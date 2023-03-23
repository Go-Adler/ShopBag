import { hashPassword } from '../../helper/passwordHelper'
import { User } from '../../models/userModel'
import { mongo } from '../../config/mongoose'

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
    console.log('coming in create user')
    return true
  } catch (error) {
    console.log('Error creating new user: ', error.message)
    return false
  }
}