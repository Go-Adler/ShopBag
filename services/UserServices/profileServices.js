import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Get all categories
export const addressAdd = async (id, address) => {
  try {
    await User.findByIdAndUpdate(id, {
      $push: {
        address,
      },
    })
    return true
  } catch (error) {
    console.error(`Error in address add: ${error.message}`)
    throw new Error(`Error in address add: ${error}`)
  }
}