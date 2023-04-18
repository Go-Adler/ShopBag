import { unblockUser, blockUser } from '../../services/userServices.js'

export const block = async (req, res) => {
  try {
    await blockUser(req.body.userId)

    res.status(200).send()
  } catch (error) {
    console.error(`Error in block user: ${error.message}`)
    res.render('error', {
      message: 'Error in block user',
      previousPage: req.headers.referer,
    })
  }
}

export const unblock = async (req, res) => {
  try {
    const block = await unblockUser(req.body.userId)

    if (!block) {
      console.log('Error blocking user')
      return res.status(404).send('Error blocking user')
    }

    res.status(200).send()
  } catch (error) {
    console.error(`Error in unblock user: ${error.message}`)
    res.render('error', {
      message: 'Error in unblock user',
      previousPage: req.headers.referer,
    })
  }
}