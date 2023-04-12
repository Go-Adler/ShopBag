import { getOrders } from '../../services/adminServices/orderServices.js'

// Render report page for admin
export const renderReportPage = async (req, res) => {
  try {
    const { name } = req.session
    await getOrders()

    res.render('admin/report', { name })
  } catch (error) {
    console.error(`Error rendering report page: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}