import express from "express"
import { validate } from "../middleware/validator.js";
import { signUpSchema, loginSchema } from "../validators/auth.validator.js";
import { login, signup, refreshTokenController, logout, me } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup route
router.post("/signup", validate(signUpSchema), signup)

// Login route
router.post("/login", validate(loginSchema), login)

// Refresh access token route
router.post("/refresh", refreshTokenController)

// Logout route
router.post("/logout", logout)

// GET user route
router.get("/me", me)

export default router