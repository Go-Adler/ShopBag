import { getAllCategories } from '../../services/adminServices/productsServices.js'
import { addressAdd } from '../../services/userServices/profileServices.js'

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
  } catch (error) {
    console.error(`Error in render address add page: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
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
  } catch (error) {
    console.error(`Error in add address: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}