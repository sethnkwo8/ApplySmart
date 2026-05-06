import express from "express"
import { validate } from "../middleware/validator.js";
import { signUpSchema, loginSchema } from "../validators/auth.validator.js";
import { login, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup route
router.post("/signup", validate(signUpSchema), signup)

// Login route
router.post("/login", validate(loginSchema), login)

export default router