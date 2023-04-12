import { getOrders, getOrdersInDate } from '../../services/adminServices/orderServices.js'

// Render report page for admin
export const renderReportPage = async (req, res) => {
  try {
    const { name } = req.session
    const orders = await getOrders()

    res.render('admin/report', { name, orders, title: 'Report' })
  } catch (error) {
    console.error(`Error rendering report page: ${error.message}`)
    res.render('error', {
      message: error.message,
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
    res.status(405).json({message:`${error.message}`})
  }
}