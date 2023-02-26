const model = require('../../models/userModel')
const db = require('../../config/mongoose')

db()

const something = () => {
    console.log('Reached email');
}

const email = async (email) => {
   const userData = await model.user.findOne({email: email})
   if (userData) {
    return true
   } else {
    return false
   }
}

const phone = async (phone) => {
    const userData = await model.user.findOne({phone: phone})
    if (userData) {
     return true
    } else {
     return false
    }
}

const admin = async (email) => {
    const userData = await model.user.findOne({email: email})
    if(userData.is_admin === 1) {
        return true
    } else {
        return false
    }
}

module.exports = {
    email,
    phone,
    admin
}