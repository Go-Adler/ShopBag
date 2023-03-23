import { getAllCategories } from '../../services/adminServices/productsServices'
import { addressAdd } from '../../services/userServices/profileServices'

// Render profile page
export const renderAddressAddPage = async (req, res) => {
  try {
    const { name } = req.session
    const categories = await getAllCategories()

    res.render('user/addAddress', {
      name,
      title: 'Profile Page User',
      categories,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error rendering add address page: ${error.message}`)
  }
}

// Render profile page
export const addAddress = async (req, res) => {
  try {
    const { name, _id } = req.session
    const categories = await getAllCategories()
    await addressAdd(_id, req.body)

    res.render('user/addAddress', {
      name,
      title: 'Profile Page User',
      categories,
      message: 'Address added successfully',
    })
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error rendering add address page: ${error.message}`)
  }
}