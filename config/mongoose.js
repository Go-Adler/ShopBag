const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const mongo = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ShopBag')
    } catch {
        console.log('Error: ' + error.message);
    }
}

module.exports = mongo