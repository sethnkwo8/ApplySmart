// Error middleware
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";
import multer from "multer";

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

    // Intercept Multer-specific pipeline limits (e.g., File too large)
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                message: "Payload too large. The uploaded CV file exceeds our maximum allowable 5MB limit container."
            });
        }
        return res.status(400).json({
            message: `File upload error: ${err.message}`
        });
    }

    // Intercept validation string errors thrown out of fileFilter layers
    if (err.message && err.message.startsWith("Validation Error:")) {
        return res.status(422).json({
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