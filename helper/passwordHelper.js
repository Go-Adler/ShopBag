import { getPasswordWithEmail } from "../services/userServices/dataServices"
import { genSalt, hash, compare } from "bcrypt"

// Hash password
export const hashPassword = async password => {
  try {
    const salt = await genSalt(10)
    console.log('hashpassword,', salt, password);
    const hashedPassword = await hash(password, salt)
    return hashedPassword
  } catch(error) {
    console.error(`Error hashing password: ${error.message}`);
    return false
  }
}

// Compare password with hashed password from database
export const comparePassword = async (password, email) => {
  try {
    const hashedPassword = await getPasswordWithEmail(email)
    const passwordsMatch = await compare(password, hashedPassword)
    return passwordsMatch
  } catch(error) {
    console.error(`Error comparing password ${error.message}`);
    return false
  }
}