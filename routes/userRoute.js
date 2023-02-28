const express = require('express')

const signInController = require('../controller/signInController')
const userController = require('../controller/user')

const route = express.Router()

route.get('/signin', signInController.userSignInLoad)
route.get('/signup', signInController.userSignUpLoad)
route.get('/home', userController.home)
route.get('/logout', userController.logout)
route.get('/profile', userController.profile)
route.get('/', signInController.start)

route.post('/signin', signInController.userSignInValidate)
route.post('/signup', signInController.userSignUpValidate)

module.exports = route