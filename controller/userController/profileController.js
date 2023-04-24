import { editUserData, addressAdd, removeAddress, getAddressById, addressEdit } from '../../services/UserServices/profileServices.js'
import { getUsersData } from '../../services/UserServices/dataServices.js'


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
      message: 'Error in address add page',
      previousPage: req.headers.referer,
    })
  }
}

// Function to add address
export const addAddress = async (req, res) => {
  try {
    const { name, _id } = req.session
    await addressAdd(_id, req.body)

    res.render('user/addAddress', {
      name,
      title: 'Profile Page User',
      message: 'Address added successfully',
    })
  } catch (error) {
    console.error(`Error in add address: ${error.message}`)
    res.render('error', {
      message: 'Error in add address',
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
    const address = await getAddressById(_id, id)

    res.render('user/editAddress', {
      name,
      title: 'Profile Page User',
      address
    })
  } catch (error) {
    console.error(`Error in add address: ${error.message}`)
    res.render('error', {
      message: 'Error in edit address',
      previousPage: req.headers.referer,
    })
  }
}

// Render edit address page
export const editAddress = async (req, res) => {
  try {
    const { name, _id } = req.session
    const { id } = req.params
    const address = await addressEdit(_id, id, req.body)

    res.render('user/editAddress', {
      name,
      title: 'Profile Page User',
      message: 'Address updated successfully',
      address
    })
  } catch (error) {
    console.error(`Error in edit address controller: ${error.message}`)
    res.render('error', {
      message: 'Error in edit address',
      previousPage: req.headers.referer,
    })
  }
}

// Render edit user page
export const renderUserEditPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const user = await getUsersData(_id)
    const { gender, phone } = user[0]
    res.render('user/userEdit', {
      name,
      gender,
      phone,
      title: 'Edit address',
    })
  } catch (error) {
    console.error(`Error in render edit user, ${error.message}`)
    res.render('error', {
      message: 'Error in render user edit page',
      previousPage: req.headers.referer,
    })
  }
}

// Render edit user page
export const handleUserEdit = async (req, res) => {
  try {
    const { _id } = req.session
    const data = req.body
    await editUserData(_id, data)
    const user = await getUsersData(_id)
    const { gender, phone, name } = user[0]
    res.render('user/userEdit', {
      name,
      success: true,
      gender,
      phone,
      title: 'Edit address',
    })
  } catch (error) {
    console.error(`Error in render edit user, ${error.message}`)
    res.render('error', {
      message: 'Error in edit user',
      previousPage: req.headers.referer,
    })
  }
}