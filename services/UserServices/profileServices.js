const { User } = require("../../models/userModel")
const db = require("../../config/mongoose")

db()

// Get all categories
const addressAdd = async (id, address) => {
  try {

    await User.findByIdAndUpdate(id, {
      $push: {
        address,
      },
    })
    return true
  } catch (error) {
    console.error(error)
    throw new Error(`Error adding address: ${error.message}`)
  }
}

module.exports = {
  addressAdd,
}
