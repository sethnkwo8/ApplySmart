// Error middleware
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (env.nodeEnv === "development") {
        console.error(err);
    }

    // Handle AppErrors
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    // Invalid ObjectId
    if ((err as any).name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    // Duplicate key error
    if ((err as any).code === 11000) {
        const field = Object.keys((err as any).keyValue)[0];
        return res.status(400).json({
            message: `${field} already exists`
        });
    }

    // Dev mode: show stack
    if (env.nodeEnv === "development") {
        return res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }

    // Production fallback
    return res.status(500).json({
        message: "Internal Server Error"
    });

}