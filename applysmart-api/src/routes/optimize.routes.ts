import express, {Response} from "express"
import { protect } from "../middleware/auth.middleware.js"
import { optimize } from "../controllers/optimize.controller.js"
import { asyncHandler } from "../utils/asyncHandler.utils.js"
import { cvUploadMiddleware } from "../middleware/cvUpload.middleware.js"
import rateLimit, {ipKeyGenerator} from "express-rate-limit";
import { AuthRequest } from "../types/express.js"

const router = express.Router()

router.use(protect)

// Rate limiting for 5 requests per minute
const aiOptimizationLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, 
    keyGenerator: (req: AuthRequest, res: Response) => {
        return req.user?.userId ?? ipKeyGenerator(req as any, res as any);
    }, // Used user ID instead of IP-only to prevent accidental multiple users block
    message: {
        success: false,
        message: "You are optimizing resumes too quickly. Please wait a minute before analyzing another CV."
    },
    standardHeaders: true, // Return standard rate limit info headers
    legacyHeaders: false,  // Disable X-RateLimit-* headers
});

// Optimize route
router.post("/", aiOptimizationLimiter, cvUploadMiddleware, asyncHandler(optimize))

export default router