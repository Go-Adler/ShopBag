import easyinvoice from 'easyinvoice'
import { getOrders, getOrder } from '../../services/userServices/orderServices.js'

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
    const data = {
      "documentTitle": "INVOICE", // Title of the document
      "currency": "USD", // Currency of the document
      "taxNotation": "vat", // Tax notation for the document (can be "vat" or "gst")
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "logo": "https://www.example.com/logo.png", // URL or base64-encoded data of the logo image
      "sender": {
        "company": "Example Inc.", // Company name of the sender
        "address": "1234 Main Street", // Address of the sender
        "zip": "12345", // ZIP code of the sender
        "city": "Anytown", // City of the sender
        "country": "USA" // Country of the sender
      },
      "client": {
        "company": "Client Company", // Company name of the client
        "address": "5678 Second Street", // Address of the client
        "zip": "67890", // ZIP code of the client
        "city": "Anytown", // City of the client
        "country": "USA" // Country of the client
      },
      "invoiceNumber": "20220401001", // Invoice number
      "invoiceDate": "01-04-2022", // Invoice date
      "products": [ // Array of products
        {
          "quantity": 2, // Quantity of the product
          "description": "Product A", // Description of the product
          "tax": 0.10, // Tax rate for the product
          "price": 10 // Price of the product
        },
        {
          "quantity": 1,
          "description": "Product B",
          "tax": 0.10,
          "price": 20
        }
      ],
      "bottomNotice": "Thank you for your business." // Bottom notice of the document
    };
    
    easyinvoice.createInvoice(data, function(result) {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
        'Content-Length': result.pdf.length
      });
      res.send(result.pdf);
    });
  } catch (error) {
    console.error(`Error in orders page render: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}