import express from "express"
import { protect } from "../middleware/auth.middleware.js"
import { validate } from "../middleware/validator.js"
import { optimizeSchema } from "../validators/optimize.validator.js"
import { optimize } from "../controllers/optimize.controller.js"

const router = express.Router()

router.use(protect)

// Optimize route
router.post("/", validate(optimizeSchema), optimize)

export default router