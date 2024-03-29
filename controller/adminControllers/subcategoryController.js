import { getSubcategoryWithId } from '../../services/adminServices.js'
import {
  updateSubcategory,
  validateSubcategory,
  validateSubcategoryWithId,
  enableSubcategory,
  disableSubcategory,
  addSubcategory,
} from '../../services/AdminServices/subcategoryServices.js'

import { getCategoryWithId } from '../../services/AdminServices/categoryServices.js'

// Render subcategory edit page
export const renderSubcategoryEdit = async (req, res) => {
  try {
    const { name } = req.session
    const { id } = req.params
    const { message } = req.query
    const subcategory = await getSubcategoryWithId(id)
    res.render('admin/subcategoryEdit', {
      name,
      title: 'Subcategory Edit',
      subcategory,
      message,
    })
  } catch (error) {
    console.error(`Error in rendering subcategory edit page: ${error.message}`)
    res.render('error', {
      message: 'Error in subcategory edit page',
      previousPage: req.headers.referer,
    })
  }
}

// Render subcategory add page
export const renderSubcategoryAdd = async (req, res) => {
  try {
    const { name } = req.session
    const { message } = req.query
    const { id } = req.params
    const category = await getCategoryWithId(id)

    res.render('admin/subcategoryAdd', {
      name,
      title: 'Subcategory Add',
      message,
      category,
    })
  } catch (error) {
    console.error(`Error in rendering subcategory add page: ${error.message}`)
    res.render('error', {
      message: 'Error in subcategory add',
      previousPage: req.headers.referer,
    })
  }
}

// Controller to edit category
export const subcategoryEdit = async (req, res) => {
  try {
    let { subcategoryName, id } = req.body
    await updateSubcategory(id, subcategoryName)
    const statusObject = {
      message: `Subcategory updated successfully: ${subcategoryName}.`,
      success: true,
    }
    return res.json(statusObject)
  } catch (error) {
    console.error(`Error in subcategory edit #subcategoryEdit: ${error.message}`)
    res.status(405).json({message: 'Error in subcategory edit'})
  }
}

// Controller to add a new subcategory
export const subcategoryAdd = async (req, res) => {
  try {
    let { subcategoryName, id } = req.body

    subcategoryName = subcategoryName.toLowerCase()
    const checkSubcategoryExist = await validateSubcategory(subcategoryName, id)
    if (checkSubcategoryExist) {
      return res.status(409).json({
        message: `Subcategory already exists '${subcategoryName}'`,
      })
    }
    await addSubcategory(subcategoryName, id)
    res.json({
      message: `Subcategory added successfully: ${subcategoryName}.`,
    })
  } catch (error) {
    console.error(`Error in subcategory add #subcategoryAddContrller: ${error.message}`)
    res.status(500).json({ message: 'Error in subcategory add'})
  }
}

// Controller to enable category
export const subcategoryEnable = async (req, res) => {
  try {
    const { id } = req.body

    const checkSubcategoryExist = await validateSubcategoryWithId(id)

    if (!checkSubcategoryExist) {
      res.status(404).json({ message: 'Subcategory does not exist' })
    }
    await enableSubcategory(id)
    res.json({ success: true })
  } catch (error) {
    console.error(`Error in subcategory enable: ${error.message}`)
    res.status(405).json({message: 'Error in subcategory enable'})
  }
}

// Controller to enable category
export const subcategoryDisable = async (req, res) => {
  try {
    const { id } = req.body

    const checkSubcategoryExist = await validateSubcategoryWithId(id)

    if (!checkSubcategoryExist) {
      res.status(404).json({ message: 'Subcategory does not exist' })
    }
    await disableSubcategory(id)
    res.json({ success: true })
  } catch (error) {
    console.error(`Error in subcategory disable #subcategoryDisableController: ${error.message}`)
    res.status(405).json({message: 'Error in subcategory disable'})
  }
}
