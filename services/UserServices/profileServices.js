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

// Remove address
export const removeAddress = async (id, _id) => {
  try {
    await User.findByIdAndUpdate(id, {
      $pull: {
        address: { _id }
      },
    })
    return true
  } catch (error) {
    console.error(`Error in removing address of a user, ${error.message}`)
    throw new Error(`Error in removing address of a user, ${error}`)
  }
}

// Remove address
export const getAddressById = async (userId, _id) => {
  try {
    
    return true
  } catch (error) {
    console.error(`Error in getting address of a user with id, ${error.message}`)
    throw new Error(`Error in getting address of a user with id, ${error}`)
  }
}

// const user = await User.aggregate([
//   { $match: { _id: userId } }, // match the user by _id
//   { $unwind: "$address" }, // deconstruct the address array
//   { $match: { "address._id": _id } }, // match the address by _id
//   { $project: { _id: 0, address: 1 } } // project only the address field
// ]);