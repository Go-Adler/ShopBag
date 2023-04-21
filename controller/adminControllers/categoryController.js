import { stringify } from 'querystring'
import { getCategoryWithId } from '../../services/adminServices.js'
import {
  validateCategoryWithId,
  validateCategory,
  addCategory,
  disableCategory,
  enableCategory,
  updateCategory,
} from '../../services/adminServices/categoryServices.js'

import {
  getSubcatergoriesOfCategoryWithId
} from '../../services/adminServices/categoryServices.js'

// Controller to add a new category
export const categoryAdd = async (req, res) => {
  try {
    let { categoryName } = req.body
    categoryName = categoryName.toLowerCase()
    const checkCategoryExist = await validateCategory(categoryName)
    const styledCategoryName =
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    if (checkCategoryExist) {
      const statusObject = {
        error: true,
        message: `${styledCategoryName} already exists in category`,
      }
      const statusString = stringify(statusObject)
      return res.redirect('/admin/category?' + statusString)
    }
    await addCategory(categoryName)
    const statusObject = {
      message: `${styledCategoryName} added to category`,
    }
    const statusString = stringify(statusObject)
    return res.redirect('/admin/category?' + statusString)
  } catch (error) {
    console.error(`Error while adding category: ${error.message}`)
    res.render('error', {
      message: 'Error in category add',
      previousPage: req.headers.referer,
    })
  }
}

// Controller to disable category
export const categoryDisable = async (req, res) => {
  try {
    const { id } = req.body
    const checkCategoryExist = await validateCategoryWithId(id)

    if (!checkCategoryExist) {
      res.status(404).json({
        message: 'Category not exists',
      })
    }
    await disableCategory(id)

    res.json({ success: true })
  } catch (error) {
    console.error(`Error while disabling category: ${error.message}`)
    res.status(405).json({message: 'Error in category disable'})
  }
}

// Controller to enable category
export const categoryEnable = async (req, res) => {
  try {
    const { id } = req.body

    const checkCategoryExist = await validateCategoryWithId(id)

    if (!checkCategoryExist) {
      res.status(404).json({ message: 'Category does not exist' })
    }
    await enableCategory(id)
    res.json({ success: true })
  } catch (error) {
    console.error(`Error enabling category: ${error.message}`)
    res.status(405).json({message: 'Error in category enable'})
  }
}

// Render category add page
export const renderCategoryAdd = (req, res) => {
  try {
    const { name } = req.session
    res.render('admin/categoryAdd', { name, title: 'Category Add' })
  } catch (error) {
    console.error(`Error rendering category: ${error.message}`)
    res.render('error', {
      message: 'Error in category add page',
      previousPage: req.headers.referer,
    })
  }
}

// Render category edit page
export const renderCategoryEdit = async (req, res) => {
  try {
    const { name } = req.session
    const { id } = req.params
    const category = await getCategoryWithId(id)
    const subcategory = await getSubcatergoriesOfCategoryWithId(id)
    res.render('admin/categoryEdit', {
      name,
      title: 'Category Edit',
      category,
      subcategory,
    })
  } catch (error) {
    console.error(`Error rendering category edit page: ${error.message}`)
    res.render('error', {
      message: 'Error in category edit',
      previousPage: req.headers.referer,
    })
  }
}

// Controller to edit category
export const categoryEdit = async (req, res) => {
  try {
    let { categoryName } = req.body
    let { id } = req.params
    await updateCategory(id, categoryName)
    const statusObject = {
      message: `Category updated successfully: ${categoryName}.`,
    }
    const statusString = stringify(statusObject)
    return res.redirect('/admin/category?' + statusString)
  } catch (error) {
    console.error(`Error in edit category: ${error.message}`)
    res.render('error', {
      message: 'Error in category edit',
      previousPage: req.headers.referer,
    })
  }
}