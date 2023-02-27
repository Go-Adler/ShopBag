const express = require('express')

const signInController = require('../controller/signInController')

const route = express.Router()

route.get('/signin', signInController.userSignInLoad)
route.get('/signup', signInController.userSignUpLoad)
route.get('/home', signInController.home)
route.get('/', signInController.start)

route.post('/signIn', signInController.userSignInValidate)
route.post('/signup', signInController.userSignUpValidate)

module.exports = route