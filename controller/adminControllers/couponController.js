import { addCoupon, couponExits, getCoupons, disableCoupon, enableCoupon, getCoupon, editCoupon } from '../../services/adminServices/couponServices.js'

// Render coupon page
export const renderCouponPage = async (req, res) => {
  try {
    const { name } = req.session
    const coupons = await getCoupons()
    res.render('admin/coupon', {
      name,
      title: 'Coupon',
      coupons
    })
  } catch (error) {
    console.error(`Error rendering coupon page: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Render coupon add page
export const renderAddCouponPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render('admin/couponAdd', {
      name,
      title: 'Coupon Add',
    })
  } catch (error) {
    console.error(`Error rendering add coupon page: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Controller to add coupon new coupon
export const couponAddController = async (req, res) => {
  try {
    let success
    const { code } = req.body
    const coupon = req.body
    const alreadyExists = await couponExits(code)
    if (!alreadyExists) {
      success = await addCoupon(coupon)
    }
    const { name } = req.session
    res.render('admin/couponAdd', {
      name,
      title: 'Coupon Add',
      code,
      alreadyExists,
      success
    })
  } catch (error) {
    console.error(`Error in adding new coupon, ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}


// Controller to enable coupon
export const couponEnable = async (req, res) => {
  try {
    const { id } = req.params
    await enableCoupon(id)
    res.status(200).send()
  } catch (error) {
    console.error(`Error in coupon enable #controller, ${error.message}`)
    res.status(405).json({message:`${error.message}`})
  }
}

// Controller to disable coupon
export const couponDisable = async (req, res) => {
  try {
    const { id } = req.params
    await disableCoupon(id)
    res.status(200).send()
  } catch (error) {
    console.error(`Error in coupon disable #controller, ${error.message}`)
    res.status(405).json({message:`${error.message}`})
  }
}

// Controller to render coupon edit page
export const renderEditCoupon = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.session
    const coupon = await getCoupon(id)
    res.render('admin/couponEdit', {
      name,
      title: 'Coupon edit',
      coupon
    })
  } catch (error) {
    console.error(`Error in coupon edit #controller, ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}

// Controller to edit coupon
export const couponEditController = async (req, res) => {
  try {
    let success, coupon
    const { code } = req.body
    const updatedCoupon = req.body
    const { id } = req.params
     const alreadyExists = await couponExits(code)
    if (!alreadyExists) {
      success = await editCoupon(id, updatedCoupon)
      coupon = await getCoupon(id)
    } else {
      coupon = await getCoupon(id)
    }
    const { name } = req.session
    res.render('admin/couponEdit', {
      name,
      title: 'Coupon Edit',
      code,
      alreadyExists,
      success,
      coupon
    })
  } catch (error) {
    console.error(`#Controller Error in editing existing coupon, ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}