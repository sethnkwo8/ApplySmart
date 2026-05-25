// Auth middleware
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express.js";
import jwt from "jsonwebtoken"
import { env } from "../config/env.js";

export function protect(req: AuthRequest, res: Response, next: NextFunction) {
    let token = req.cookies?.refreshToken;

    const authHeader = req.headers.authorization;

    if (!token && authHeader) {
        const parts = authHeader.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
            token = parts[1];
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, env.jwtRefreshSecret) as {userId: string}

        req.user = {
            userId: decoded.userId
        }

        next()
    } catch(err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}