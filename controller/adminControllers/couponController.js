// Render coupon page
export const renderCouponPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render("admin/coupon", {
      name,
      title: "Coupon",
    })
  } catch (error) {
    console.error(`Error rendering coupon page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}

// Render coupon add page
export const renderAddCouponPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render("admin/couponAdd", {
      name,
      title: "Coupon Add",
    })
  } catch (error) {
    console.error(`Error rendering add coupon page: ${error.message}`);
    res.render("error", { message: error.message, previousPage: req.headers.referer})
  }
}
