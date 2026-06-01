// Dashboard route
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getDashboard, getSingleOptimization } from "../controllers/dashboard.controller.js";

const router = express.Router()

router.use(protect);

// GET route to get all optimization data
router.get("/", getDashboard);

// GET route to get single optimization data
router.get("/:id", getSingleOptimization);

export default router;