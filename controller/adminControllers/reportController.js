import { getOrders, getOrdersInDate } from '../../services/adminServices/orderServices.js'

import ejs from 'ejs'
import puppeteer from 'puppeteer'

// Render report page for admin
export const renderReportPage = async (req, res) => {
  try {
    const { name } = req.session
    const orders = await getOrders()

    res.render('admin/report', { name, orders, title: 'Report' })
  } catch (error) {
    console.error(`Error rendering report page: ${error.message}`)
    res.render('error', {
      message: 'Error in report page',
      previousPage: req.headers.referer,
    })
  }
}

//  Function to fetch sales report
export const getSalesReport = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.body
    const orders = await getOrdersInDate(dateFrom, dateTo)
    
    res.json({ orders })
  } catch (error) {
    console.error(`Error in #getSalesReport: ${error.message}`)
    res.status(405).json({message: 'Error getting sales report'})
  }
}

// Render order details pages
export const downloadReport = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.body
    const orders = await getOrdersInDate(dateFrom, dateTo)
    
    // Create some dummy invoice data
    const reportData = {
      orders,
      dateFrom,
      dateTo
    }

    // Render the invoice.ejs template with the invoice data
    const html = await ejs.renderFile('views/admin/reportDownload.ejs', {
      reportData,
    })

    // Launch a headless browser instance
    const browser = await puppeteer.launch()

    // Create a new page object
    const page = await browser.newPage()

    // Set the HTML content of the page
    await page.setContent(html)

    // Save the page as a PDF buffer
    const pdfBuffer = await page.pdf({
      scale: 0.6,
      format: 'A4', // The paper size
      printBackground: true, // Include background graphics
      margin: {
        // The page margins
        top: '0.1cm',
        bottom: '0.1cm',
        left: '0.1cm',
        right: '0.1cm',
      },
    })

    // Close the browser instance
    await browser.close()

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf')

    // Send the PDF buffer as the response body
    res.send(pdfBuffer)
  } catch (error) {
    console.error(`Error in creating sales report, #downloadController ${error.message}`)
    res.status(405).json({message:`${error.message}`})
  }
}