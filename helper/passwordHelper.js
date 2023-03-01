const bcrypt = require("bcrypt")
const getUserData = require("../services/UserServices/getData")

const hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch(error) {
    console.error(error);
    return false
  }
}

const comparePassword = async (password, email) => {
  try {
    const hashedPassword = await getUserData.getPassword(email)
    const passwordsMatch = await bcrypt.compare(password, hashedPassword)
    return passwordsMatch
  } catch(error) {
    console.error(error);
    return false
  }
}

module.exports = {
  hashPassword,
  comparePassword
}