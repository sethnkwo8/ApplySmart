// Auth services
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup user function
export async function signupUser(
    name: string, 
    email: string, 
    password: string,
) {
    // Check if user exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new AppError("User already exists", 400)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    }
}

// Login user function
export async function loginUser(
    email: string, 
    password: string
) {
    // Get user
    const user = await User.findOne({email: email.toLowerCase()});

    if (!user) {
        throw new AppError("Invalid email or password", 401)
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new AppError("Invalid email or password", 401)
    }

    const accessToken = jwt.sign(
        {userId: user._id},
        env.jwtSecret,
        {expiresIn: "15m"}
    )

    const refreshToken = jwt.sign(
        {userId: user._id},
        env.jwtRefreshSecret,
        {expiresIn: "7d"}
    )

    return {
        accessToken,
        refreshToken,
        user: { id: user._id, name: user.name, email: user.email }
    }
}

// Refresh access token function
export function refreshTokenService(refreshToken: string) {
    if (!refreshToken) {
        throw new AppError("Unauthorized", 401)
    }

    try{
        const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret) as {userId: string}

        const {userId} = decoded;

        const accessToken = jwt.sign(
            {userId},
            env.jwtSecret,
            {expiresIn: "15m"}
        )

        return {
            accessToken
        }
    } catch (err) {
        throw new AppError("Invalid or expired refresh token", 403)
    }
}