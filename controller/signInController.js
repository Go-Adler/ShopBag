// const db = require('../config/db')
const db = require('../config/mongoose')

const userSignInLoad = (req, res) => {
    res.render('./user/userSignIn')
}

const userSignUpLoad = (req, res) => {
    res.render('./user/userSignUp')
}

const userSignInValidate = async (req, res) => {
  
}

const userSignUpValidate = async (req, res) => {
    
    const userData = await db.user.create({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        password: passwordToDB,
        is_admin: req.body.is_admin
    })
    if(userData) {
        console.log('user data: ', userData);
    }
}


module.exports = {
    userSignInLoad,
    userSignUpLoad,
    userSignInValidate,
    userSignUpValidate
}