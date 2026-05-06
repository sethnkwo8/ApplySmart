// Database connection
import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
    try{
        await mongoose.connect(env.mongoUri)
        console.log("MongoDB connected")
    } catch(err) {
        console.error(err)
        throw err
    }
}