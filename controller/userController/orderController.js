import ejs from 'ejs'
import puppeteer from 'puppeteer'

import {
  getOrders,
  getOrder,
  toReturned,
  toCancelled,
  checkCOD,
  addToWallet
} from '../../services/userServices/orderServices.js'

// Render wishlist page
export const renderOrdersPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const orders = await getOrders(_id)
    res.render('user/myOrders', {
      name,
      title: 'My orders',
      orders,
    })
  } catch (error) {
    console.error(`Error in orders page render: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Render order details pages
export const renderOrdersDetailsPage = async (req, res) => {
  try {
    const { name, _id } = req.session
    const { id } = req.params
    const order = await getOrder(_id, id)
    res.render('user/orderDetails', {
      name,
      title: 'My orders',
      order,
    })
  } catch (error) {
    console.error(`Error in orders page render: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Render order details pages
export const downloadInvoice = async (req, res) => {
  try {
    // Get user id from session
    const { _id } = req.session

    // Get order id from params
    const { orderId } = req.params
    
    // Get order details for invoice
    const order = await getOrder(_id, orderId)

    console.log(order, 57);

    // Get address id from or
    const address = order.address
  
    
    // Create some dummy invoice data
    const invoiceData = {
      address,
      order
    }

    // Render the invoice.ejs template with the invoice data
    const html = await ejs.renderFile('views/user/invoice.ejs', {
      invoiceData,
    })

    // Launch a headless browser instance
    const browser = await puppeteer.launch()

    // Create a new page object
    const page = await browser.newPage()

    // Set the HTML content of the page
    await page.setContent(html)

    // Save the page as a PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4', // The paper size
      printBackground: true, // Include background graphics
      margin: {
        // The page margins
        top: '1cm',
        bottom: '1cm',
        left: '1cm',
        right: '1cm',
      },
    })

    // Close the browser instance
    await browser.close()

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf')

    // Send the PDF buffer as the response body
    res.send(pdfBuffer)
  } catch (error) {
    console.error(`Error in orders page render, #controller #orderController: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Change order status to returned
export const statusToReturned = async (req, res) => {
  try {
    const { _id } = req.session
    const { orderId } = req.params
    await toReturned(_id, orderId)
    await addToWallet(_id, orderId)
    res.redirect('back')
  } catch (error) {
    console.error(`Error in change status to order to returned  #orderController: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Change order status to cancelled
export const statusToCancel = async (req, res) => {
  try {
    const { _id } = req.session
    const { orderId } = req.params
    await toCancelled(_id, orderId)
    const paymentCOD = await checkCOD(_id, orderId)
    if (paymentCOD === 'COD' || 'wallet') await addToWallet(_id, orderId)
    res.redirect('back')
  } catch (error) { 
    console.error(`Error in change status to order to cancelled  #orderController: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}