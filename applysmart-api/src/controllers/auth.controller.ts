// Auth controllers
import { Request, Response, NextFunction } from "express";
import { loginUser, signupUser, refreshAccessTokenService } from "../services/auth.service.js";

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
        const {accessToken, refreshToken} = await loginUser(email, password);

        res.status(200).json({
            accessToken,
            refreshToken
        })
    } catch(err) {
        next(err)
    }
}

// Refresh token controller
export function refreshAccessToken(req: Request, res: Response, next: NextFunction) {
    const {refreshToken} = req.body;

    try {
        // Call function
        const {accessToken} = refreshAccessTokenService(refreshToken);

        res.status(200).json({
            accessToken
        })
    } catch (err) {
        next(err)
    }
}