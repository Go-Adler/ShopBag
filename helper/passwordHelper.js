import { getPasswordWithEmail } from '../services/userServices/dataServices.js'
import { genSalt, hash, compare } from 'bcrypt'

// Hash password
export const hashPassword = async (password) => {
  try {
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
  } catch (error) {
    throw new Error(`Error in password hash: ${error.message}`)
  }
}

// Compare password with hashed password from database
export const comparePassword = async (password, email) => {
  try {
    const hashedPassword = await getPasswordWithEmail(email)
    const passwordsMatch = await compare(password, hashedPassword)
    return passwordsMatch
  } catch (error) {
    throw new Error(`Error in comparePassword: ${error.message}`)
  }
}
