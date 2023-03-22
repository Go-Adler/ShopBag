// Render coupon page
const renderCouponPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render("admin/coupon", {
      name,
      title: "Coupon",
    })
  } catch (error) {
    throw new Error(`Error loading coupon page: ${error.message}`)
  }
}

// Render coupon add page
const renderAddCouponPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render("admin/couponAdd", {
      name,
      title: "Coupon Add",
    })
  } catch (error) {
    throw new Error(`Error loading coupon add page: ${error.message}`)
  }
}

module.exports = { 
  renderCouponPage,
  renderAddCouponPage
 }
