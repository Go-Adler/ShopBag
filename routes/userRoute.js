const express = require('express')

const signInController = require('../controller/signInController')

const route = express.Router()

route.get('/signin', signInController.userSignIn)
route.get('/signup', signInController.userSignUp)
route.post('/signIn', signInController.userHome)

module.exports = route

    