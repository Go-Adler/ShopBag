const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        required: true
    },
    isBlocked: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User