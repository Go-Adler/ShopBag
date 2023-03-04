const { genSalt, hash, compare } = require("bcrypt")
const { getPasswordWithEmail } = require("../services/UserServices/dataServices")

// Hash password
const hashPassword = async password => {
  try {
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
  } catch(error) {
    console.error(`Error hashing password ${error.message}`);
    return false
  }
}

// Compare password with hashed password from database
const comparePassword = async (password, email) => {
  try {
    const hashedPassword = await getPasswordWithEmail(email)
    const passwordsMatch = await compare(password, hashedPassword)
    return passwordsMatch
  } catch(error) {
    console.error(`Error comparing password ${error.message}`);
    return false
  }
}

module.exports = {
  hashPassword,
  comparePassword
}