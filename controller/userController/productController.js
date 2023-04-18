import { getProductWithId } from '../../services/userServices/dataServices.js'
import {
  wishlistAdd,
  wishlistRemove,
  getWishlistedProducts,
  cartAdd,
  cartRemove,
  getWishlistedIDs,
} from '../../services/userServices/productServices.js'
import {
  getAllCategories,
  getAllProductsByNameAToZ,
  getAllProductsByNameZToA,
  getAllProductsByPriceLowToHigh,
  getAllProductsByPriceHighToLow,
  searchProduct,
} from '../../services/adminServices/productsServices.js'
import { getCart } from '../../services/userServices/cartServices.js'

// Render product page
export const renderProductPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const { id } = req.params
    const wishlist = await getWishlistedProducts(_id)
    const product = await getProductWithId(id)
    const categories = await getAllCategories()
    const cart = await getCart(_id)

    const isInCart = cart.some(item => item.product.equals(product._id) ? true : false)

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
      isInCart
    })
  } catch (error) {
    console.error(`Error in product page render: ${error.message}`)
    res.render('error', {
      message: 'Error in product page',
      previousPage: req.headers.referer,
    })
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
    console.error(`Error in wishlist add: ${error.message}`)
    res.render('error', {
      message: 'Error in add to wishlist',
      previousPage: req.headers.referer,
    })
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
    console.error(`Error in remove from wishlist: ${error.message}`)
    res.render('error', {
      message: 'Error in remove from wishlist',
      previousPage: req.headers.referer,
    })
  }
}

// Function to add product to cart
export const addToCart = async (req, res) => {
  try {
    const { _id } = req.session
    const { id } = req.params
    await cartAdd(_id, id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`Error in adding produt to cart, #addToCartController: ${error.message}`)
    res.status(405).json({message: 'Error adding to cart'})
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
    console.error(`Error in remove from cart: ${error.message}`)
    res.render('error', {
      message: 'Error in remove from cart',
      previousPage: req.headers.referer,
    })
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
    console.error(`Error in #productSortByNameAtoZ : ${error.message}`)
    res.status(405).json({message: 'Error in products sort'})
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
    console.error(`Error in #productSortByNameZToAController: ${error.message}`)
    res.status(405).json({message: 'Error in product sort'})
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
    console.error(`Error in #productSortByPriceLowToHighController: ${error.message}`)
    res.status(405).json({message: 'Error in product sort'})
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
    console.error(`Error in #productSortByPriceHighToLow: ${error.message}`)
    res.status(405).json({message: 'Error in product sort'})
  }
}

// Products sort by price high to low function
export const productSearch = async (req, res) => {
  try {
    const { _id } = req.session
    const { searchQuery, sortQuery, categoryQuery, pageQuery } = req.body

    const wishlist = await getWishlistedIDs(_id)
    const products = await searchProduct(searchQuery, sortQuery, categoryQuery, pageQuery)
    res.json({ products, wishlist })
  } catch (error) {
    console.error(`Error in #productSearchController: ${error.message}`)
    res.status(405).json({message: 'Error in product search'})
  }
}