import { unblockUser, blockUser } from '../../services/userServices'

export const block = async (req, res) => {
  try {
    await blockUser(req.body.userId)

    res.status(200).send()
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
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
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}