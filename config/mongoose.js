import mongoose from "mongoose"

mongoose.set('strictQuery', true)

export const mongo = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/shop_bag')
    } catch {
        throw new Error(`Error: ${error.message}`);
    }
}