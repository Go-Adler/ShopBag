import { getProductWithId } from '../../services/userServices/dataServices'
import {
  wishlistAdd,
  wishlistRemove,
  getWishlistedProducts,
  cartAdd,
  cartRemove,
  getWishlistedIDs,
} from '../../services/userServices/productServices'
import {
  getAllCategories,
  getAllProductsByNameAToZ,
  getAllProductsByNameZToA,
  getAllProductsByPriceLowToHigh,
  getAllProductsByPriceHighToLow,
  searchProduct,
} from '../../services/adminServices/productsServices'

// Render product page
export const renderProductPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const { id } = req.params
    const wishlist = await getWishlistedProducts(_id)
    const product = await getProductWithId(id)
    const categories = await getAllCategories()

    let isWishlist

    if (wishlist.includes(product._id)) {
      isWishlist = true
    }

    res.render('user/product', {
      name,
      product,
      isWishlist,
      title: 'product page',
      categories,
    })
  } catch (error) {
    console.error(error)
    res.send(`Error loading products page: ${error.message}`)
  }
}

// Controller to add product to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.body
    await wishlistAdd(_id, id)
    res.status(200).send()
  } catch (error) {
    console.error(error)
    res.send(`Error loading products page: ${error.message}`)
  }
}

// Controller to remove product from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.body
    await wishlistRemove(_id, id)
    res.status(200).send()
  } catch (error) {
    console.error(error)
    res.send(`Error loading products page: ${error.message}`)
  }
}

// Function to add product to cart
export const addToCart = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.params
    await cartAdd(_id, id)
    res.redirect('/user/cart')
  } catch (error) {
    console.error(error)
    res.send(`Error adding product to cart: ${error.message}`)
  }
}

// Function to remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.params
    await cartRemove(_id, id)
    res.redirect('/user/cart')
  } catch (error) {
    console.error(error)
    res.send(`Error removing product from cart: ${error.message}`)
  }
}

// Products sort by name a to z function
export const productSortByNameAToZ = async (req, res) => {
  try {
    const { _id } = req.session
    const wishlist = await getWishlistedIDs(_id)
    const products = await getAllProductsByNameAToZ()

    res.json({ products, wishlist })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error sorting products: ${error.message}`)
  }
}

// Products sort by name z to a function
export const productSortByNameZToA = async (req, res) => {
  try {
    const { _id } = req.session
    const wishlist = await getWishlistedIDs(_id)
    const products = await getAllProductsByNameZToA()

    res.json({ products, wishlist })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error sorting products: ${error.message}`)
  }
}

// Products sort by name z to a function
export const productSortByPriceLowToHigh = async (req, res) => {
  try {
    const { _id } = req.session
    const wishlist = await getWishlistedIDs(_id)
    const products = await getAllProductsByPriceLowToHigh()

    res.json({ products, wishlist })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error sorting products: ${error.message}`)
  }
}

// Products sort by price high to low function
export const productSortByPriceHighToLow = async (req, res) => {
  try {
    const { _id } = req.session
    const wishlist = await getWishlistedIDs(_id)
    const products = await getAllProductsByPriceHighToLow()

    res.json({ products, wishlist })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error sorting products: ${error.message}`)
  }
}

// Products sort by price high to low function
export const productSearch = async (req, res) => {
  try {
    const { _id } = req.session
    const { searchQuery, sort } = req.body

    const wishlist = await getWishlistedIDs(_id)
    const products = await searchProduct(searchQuery, sort)

    res.json({ products, wishlist })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error sorting products: ${error.message}`)
  }
}