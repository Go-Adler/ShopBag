import ejs from 'ejs'
import puppeteer from 'puppeteer'

import {
  getOrders,
  getOrder,
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

    // Save the page as a PDF file
    await page.pdf({
      path: '../../public/invoice.pdf', // The file name
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


    // Send the PDF file as a response
    res.sendFile('invoice.pdf', {root: '../../public'});
  } catch (error) {
    console.error(`Error in orders page render, #controller #orderController: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}
