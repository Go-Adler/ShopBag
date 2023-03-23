import { User } from '../models/userModel'
import { mongo } from '../../config/mongoose'

mongo()

export const findUser = async (id) => {
  try {
    const userData = await User.findOne({ _id: id })
    return userData
  } catch (error) {
    console.log('Error finding user data from database: ', error)
    return false
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
    console.log('Error blocking user: ', error)
    return false
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
    console.log('Error unblocking user: ', error)
    return false
  }
}