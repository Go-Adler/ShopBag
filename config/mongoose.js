import mongoose from "mongoose"
import { config } from 'dotenv'

config({ path: ".env" })
const mongoPassword = process.env.MONGO_PASSWORD

mongoose.set('strictQuery', true)

export const mongo = async () => {
    try {
        await mongoose.connect(`mongodb+srv://goadler:${mongoPassword}@cluster0.nhchirs.mongodb.net/?retryWrites=true&w=majority`)
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}