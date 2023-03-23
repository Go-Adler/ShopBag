import { Product } from '../../models/adminModel/productsModel'
import { User } from '../../models/userModel'
import { Category } from '../../models/adminModel/categoryModel'
import { mongo } from '../../config/mongoose'

mongo()

export const addProduct = async (product) => {
  try {
    const {
      productName,
      price,
      description,
      stock,
      images,
      productCategory,
      productSubcategory,
    } = product

    await Product.create({
      productName,
      price,
      description,
      stock,
      images,
      productCategory,
      productSubcategory,
    })

    return true
  } catch (error) {
    throw new Error(`Error adding products: ${error.message}`)
  }
}

export const getAllProductsPaginated = async (page) => {
  try {
    const products = await Product.paginate(
      {},
      { page, limit: 9, sort: { productName: 1 } }
    )

    return products
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products: ${error.message}`)
  }
}

// Get all products with sort A to Z
export const getAllProductsByNameAToZ = async () => {
  try {
    const products = await Product.paginate(
      {},
      { page: 1, limit: 6, sort: { productName: 1 } }
    )
    return products
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products by a to z: ${error.message}`)
  }
}

// Get all products with sort A to Z
export const getAllProductsByNameZToA = async () => {
  try {
    const products = await Product.paginate(
      {},
      { page: 1, limit: 6, sort: { productName: -1 } }
    )
    return products
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products by z to a: ${error.message}`)
  }
}

// Get all products with sort A to Z
export const getAllProductsByPriceLowToHigh = async () => {
  try {
    const products = await Product.paginate(
      {},
      { page: 1, limit: 6, sort: { price: 1 } }
    )
    return products
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products by z to a: ${error.message}`)
  }
}

// Get all products with sort A to Z
export const getAllProductsByPriceHighToLow = async () => {
  try {
    const products = await Product.paginate(
      {},
      { page: 1, limit: 6, sort: { price: -1 } }
    )
    return products
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products by z to a: ${error.message}`)
  }
}

// Search product
export const searchProduct = async (searchQuery, sort) => {
  try {
    if (sort === 'nameA-Z') {
      sortQuery = { productName: 1 }
    } else if (sort === 'nameZ-A') {
      sortQuery = { productName: -1 }
    } else if (sort === 'priceLowToHigh') {
      sortQuery = { price: 1 }
    } else if (sort === 'priceHighToLow') {
      sortQuery = { price: -1 }
    }

    const regex = new RegExp(`^${searchQuery}`, 'i')
    const products = await Product.paginate(
      { productName: { $regex: regex } },
      { page: 1, limit: 6, sort: sortQuery }
    )
    return products
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products by search: ${error.message}`)
  }
}

// Get all categories
export const getAllCategories = async () => {
  try {
    const categories = await Category.find()
    return categories
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting products: ${error.message}`)
  }
}

// Get product
export const getProduct = async (id) => {
  try {
    const product = await Product.findById(id)
      .populate('productCategory')
      .populate('productSubcategory')
    return product
  } catch (error) {
    console.error(error)
    throw new Error(`Error getting product: ${error.message}`)
  }
}

// Function to disable product
export const productDisable = async (id) => {
  try {
    const product = await Product.findById(id)

    product.isDisabled = true
    await product.save()
    return true
  } catch (error) {
    console.log('Error disabling product: ', error)
    return false
  }
}

// Function to disable product
export const productEnable = async (id) => {
  try {
    const product = await Product.findById(id)

    product.isDisabled = false
    await product.save()
    return true
  } catch (error) {
    console.log('Error enabling product: ', error)
    return false
  }
}

// Function to update product
export const productUpdate = async (_id, products) => {
  try {
    const {
      productName,
      description,
      price,
      stock,
      productCategory,
      productSubcategory,
      images,
      selected_images,
    } = products
    if (images.length && selected_images.length !== 1) {
      await Promise.all(
        selected_images.map((element, index) => {
          return Product.updateOne(
            { _id },
            {
              $set: {
                [`images.${element}`]: images[index],
              },
            }
          )
        })
      )
    } else if (images.length) {
      await Product.updateOne(
        { _id },
        {
          $set: {
            [`images.${selected_images}`]: images[0],
          },
        }
      )
    }
    await Product.updateOne(
      { _id },
      {
        $set: {
          productName,
          description,
          price,
          stock,
          productCategory,
          productSubcategory,
        },
      }
    )

    return true
  } catch (error) {
    console.log('Error updating product: ', error)
    return false
  }
}

// Function to create order
export const createOrder = async (id, orders) => {
  try {
    const order = await User.findByIdAndUpdate(
      id,
      { $push: { orders } },
      { new: true }
    )
    return order
  } catch (error) {
    console.log('Error updating product: ', error)
    return false
  }
}