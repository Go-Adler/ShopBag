import { getTotal } from '../../services/adminServices/orderServices.js';

// Render sign-in page for user
export const getTotalDashboard = async (req, res) => {
  try {
    const total = await getTotal()
    console.log(total, 7);
    res.json({ total })
  } catch (error) {
    console.error(`Error rendering sign in page of user: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
};