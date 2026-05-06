import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";

const app = express()

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max requests per IP 
    message: "Too many requests. Please try again later"
})

// Express knows it's behind a proxy
app.set("trust proxy", 1)

// Helmet security
app.use(helmet())

// CORS middleware
app.use(cors())
app.use(express.json())

// Logging
if (env.nodeEnv === "development") {
    app.use(morgan("dev"))
}

// Rate limiter
app.use(limiter)

export default app