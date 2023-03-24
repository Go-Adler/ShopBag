import { User } from '../models/userModel.js'
import { mongo } from '../config/mongoose.js'

mongo()

export const findUser = async (id) => {
  try {
    const userData = await User.findOne({ _id: id })
    return userData
  } catch (error) {
    console.error(`Error in find user: ${error.message}`)
    throw new Error(`Error in find user: ${error}`)
  }
}

export const blockUser = async (id) => {
  try {
    const userData = await findUser(id)

    if (!userData) {
      throw new Error('User not found')
    }

    userData.isBlocked = true
    await userData.save()
    return true
  } catch (error) {
    console.error(`Error in block user: ${error.message}`)
    throw new Error(`Error in block user: ${error}`)
  }
}

export const unblockUser = async (id) => {
  try {
    const userData = await findUser(id)

    if (!userData) {
      throw new Error('User not found')
    }

    userData.isBlocked = false
    await userData.save()
    return true
  } catch (error) {
    console.error(`Error in unblock user: ${error.message}`)
    throw new Error(`Error in unblock user: ${error}`)
  }
}