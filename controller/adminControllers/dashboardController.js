import { getMonthlySales, getCategorySales } from '../../services/adminServices/orderServices.js';

// Controller to fetch details for admin dashboard
export const getTotalDashboard = async (req, res) => {
  try {
    const monthlySales = await getMonthlySales()
    const { categorySales, subcategorySales  } = await getCategorySales()

   res.json({ monthlySales, categorySales, subcategorySales })
  } catch (error) {
    console.error(`Error in #getTotalDashboardController: ${error.message}`)
    res.status(405).json({message: 'Error in get dashboard details'})
  }
};