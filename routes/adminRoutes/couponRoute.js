const express = require('express')
import { renderAddCouponPage, renderCouponPage } from "../../controller/adminControllers/couponController"

const route = express.Router()

route.get("/add", renderAddCouponPage);
route.get("/", renderCouponPage);

module.exports = route
