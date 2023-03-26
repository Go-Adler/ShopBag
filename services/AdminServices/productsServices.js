import { Product } from '../../models/adminModel/productsModel.js'
import { User } from '../../models/userModel.js'
import { Category } from '../../models/adminModel/categoryModel.js'
import { mongo } from '../../config/mongoose.js'

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
    console.error(`Error in add product: ${error.message}`)
    throw new Error(`Error in add product ${error}`)
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
    console.error(`Error in get all products paginated: ${error.message}`)
    throw new Error(`Error in get all products paginated ${error}`)
  }
}

// Get all products with sort A to Z
export const getAllProductsByNameAToZ = async () => {
  try {
    const products = await Product.paginate(
      { isDisabled: { $ne: false } },
      { page: 1, limit: 6, sort: { productName: 1 } }
    )
    return products
  } catch (error) {
    console.error(`Error in get all products by name a to z: ${error.message}`)
    throw new Error(`Error in get all products by name a to z: ${error}`)
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
    console.error(`Error in get all products by name z to a: ${error.message}`)
    throw new Error(`Error in get all products by name z to a: ${error}`)
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
    console.error(`Error in get all products by price low to high: ${error.message}`)
    throw new Error(`Error in get all products by price low to high: ${error}`)
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
    console.error(`Error in get all products by price high to low: ${error.message}`)
    throw new Error(`Error in get all products by price high to low: ${error}`)
  }
}

// Search product
export const searchProduct = async (searchQuery, sort, productCategory, page) => {
  try {
    let products, sortQuery
    if (sort === 'a-z') {
      sortQuery = { productName: 1 }
    } else if (sort === 'z-a') {
      sortQuery = { productName: -1 }
    } else if (sort === 'highToLow') {
      sortQuery = { price: -1 }
    } else if (sort === 'lowToHigh') {
      sortQuery = { price: 1 }
    }

    const regex = new RegExp(`^${searchQuery}`, 'i')
    if( productCategory === 'all' ) {
      products = await Product.paginate(
        { productName: { $regex: regex }, isDisabled: false },
        { page, limit: 9, sort: sortQuery }
      ) 
    } else {
      products = await Product.paginate(
        { productName: { $regex: regex }, productCategory, isDisabled: false },
        { page, limit: 9, sort: sortQuery }
      )
    }
    console.log(products);
    return products
  } catch (error) {
    console.error(`Error in search product: ${error.message}`)
    throw new Error(`Error in search product: ${error}`)
  }
}

// Get all categories
export const getAllCategories = async () => {
  try {
    const categories = await Category.find()
    return categories
  } catch (error) {
    console.error(`Error in get all categories: ${error.message}`)
    throw new Error(`Error in get all categories: ${error}`)
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
    console.error(`Error in get product: ${error.message}`)
    throw new Error(`Error in search: ${error}`)
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
    console.error(`Error in product disable: ${error.message}`)
    throw new Error(`Error in product disable: ${error}`)
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
    console.error(`Error in product enable: ${error.message}`)
    throw new Error(`Error in product enable: ${error}`)
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
    console.error(`Error in product update: ${error.message}`)
    throw new Error(`Error in product update: ${error}`)
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
    console.error(`Error in create order: ${error.message}`)
    throw new Error(`Error in create order: ${error}`)
  }
}