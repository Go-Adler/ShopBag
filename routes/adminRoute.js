const express = require('express')

const adminAccessController = require('../controller/adminAccessController')

const route = express.Router()

route.use('/signin', adminAccessController.signInLoad)

module.exports = route