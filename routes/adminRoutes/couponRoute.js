const express = require('express')
const { renderCouponPage, renderAddCouponPage } = require("../../controller/adminControllers/couponController")

const route = express.Router()

route.get("/add", renderAddCouponPage);
route.get("/", renderCouponPage);



module.exports = route
