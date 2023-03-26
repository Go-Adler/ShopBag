import { User } from '../../models/userModel.js'
import { mongo } from '../../config/mongoose.js'

mongo()

// Function to add address to the database
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

// Get address by id
export const getAddressById = async (userId, _id) => {
  try {
    const address = await User.findOne({ _id: userId, 'address._id': _id }, { 'address.$': 1, _id: 0 });
    return address.address[0];
  } catch (error) {
    console.error(`Error in getting address of a user with id, ${error.message}`);
    throw new Error(`Error in getting address of a user with id, ${error}`);
  }
}


// Function to edit existing  address of user
export const addressEdit = async (_id, addressId, address) => {
  try {
   const addressUpdated = await User.updateOne(
      { _id, "address._id": addressId },
      { $set: { "address.$": address } })
    return addressUpdated
  } catch (error) {
    console.error(`Error in address edit service, ${error.message}`)
    throw new Error(`Error in address edit service, ${error}`)
  }
}