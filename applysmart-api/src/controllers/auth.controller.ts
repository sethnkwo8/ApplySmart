// Auth controllers
import { Request, Response, NextFunction } from "express";
import { loginUser, signupUser, refreshTokenService, getUser, googleAuthService } from "../services/auth.service.js";
import { env } from "../config/env.js";

// Signup controller
export async function signup(req: Request, res: Response, next: NextFunction) {
    const {name, email, password} = req.body;

    try {
        const user = await signupUser(name, email, password);
        res.status(201).json({
            message: "User created",
            user
        })
    } catch(err) {
        next(err)
    }
    
}

// Login controller
export async function login(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body;

    try {
        const {accessToken, refreshToken, user} = await loginUser(email, password);

        res
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.nodeEnv === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        })
        .status(200).json({
            accessToken,
            user
        })
    } catch(err) {
        next(err)
    }
}

// Refresh token controller
export async function refreshTokenController(req: Request, res: Response, next: NextFunction) {
    const {refreshToken} = req.cookies;

    try {
        // Call function
        const {accessToken, user} = await refreshTokenService(refreshToken);

        res.status(200).json({
            accessToken,
            user
        })
    } catch (err) {
        next(err)
    }
}

// Logout user controller
export async function logout(req: Request, res: Response, next: NextFunction) {
    try{
        res
        .clearCookie("refreshToken", {
            httpOnly: true,
            secure: env.nodeEnv === "production",
            sameSite: "lax",
            path: "/"
        })
        .status(200)
        .json({
            success: true,
            message: "Logged out successfully"
        })
    } catch(err) {
        next(err)
    }
}

// Get user controller
export async function me(req: Request, res: Response, next: NextFunction) {
    const {refreshToken} = req.cookies;

    try {
        const user = await getUser(refreshToken);

        res.status(200).json({
            user
        })
    } catch(err) {
        next(err)
    }
}

// Google Auth controller
export async function googleLogin(req: Request, res: Response, next: NextFunction) {
    const {idToken} = req.body // Sent from frontend

    try {
        const {accessToken, refreshToken, user} = await googleAuthService(idToken)

        res
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.nodeEnv === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        })
        .status(200).json({
            accessToken,
            user
        })
    } catch(err) {
        next(err)
    }
}