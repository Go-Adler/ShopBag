import { getAllCategories } from '../../services/adminServices/productsServices.js'
import { addressAdd, removeAddress, getAddressById  } from '../../services/userServices/profileServices.js'

// Render address add page
export const renderAddressAddPage = async (req, res) => {
  try {
    const { name } = req.session

    res.render('user/addAddress', {
      name,
      title: 'Add address',
    })
  } catch (error) {
    console.error(`Error in render address add page, ${error.message}`)
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

// Function to remove address of user
export const removeAddressOfUser = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.body
    await removeAddress(_id, id)

    res.status(200).send()
  } catch (error) {
    console.error(`Error in removing address: ${error.message}`)
    res.status(405).send()
  }
}

// Render edit address page
export const renderEditAddress = async (req, res) => {
  try {
    const { name, _id } = req.session
    const { id } = req.params
    await getAddressById(_id, id)

    res.render('user/editAddress', {
      name,
      title: 'Profile Page User',
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