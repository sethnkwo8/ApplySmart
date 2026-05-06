import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const PORT = env.port

async function startServer() {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log("Server is running on port: ", PORT)
        })
    } catch(err) {
        console.error("Failed to start server")
        process.exit(1)
    }
}

startServer();