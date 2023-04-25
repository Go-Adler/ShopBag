import mongoose from "mongoose"
import { config } from 'dotenv'

config({ path: "./services/userServices/.env" })

mongoose.set('strictQuery', true)

export const mongo = async () => {
    try {
        const mongoPassword = process.env.MONGO_PASS
        await mongoose.connect(`mongodb+srv://goadler:${mongoPassword}@cluster0.nhchirs.mongodb.net/Shop_Bag`)
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}