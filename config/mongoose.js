import mongoose from "mongoose"
import { config } from 'dotenv'

config({ path: ".env" })
const mongoUrl = process.env.MONGO_URL

mongoose.set('strictQuery', true)

export const mongo = async () => {
    try {
        mongoose.connect(mongoUrl)
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}