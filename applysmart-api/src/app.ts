import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.route.js";
import optimizeRoutes from "./routes/optimize.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

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
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

// Cookie parser for reading cookies
app.use(cookieParser())

app.use(express.json())

// Logging
if (env.nodeEnv === "development") {
    app.use(morgan("dev"))
}

// Rate limiter
app.use(limiter)

// Auth routes
app.use("/auth", authRoutes)

// Optimize routes
app.use("/optimize", optimizeRoutes)

// Error handler
app.use(errorHandler)

export default app