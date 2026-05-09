// Optimize controller
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";
import { optimizeCV } from "../services/optimize.service.js";

export async function optimize(req: AuthRequest, res: Response, next: NextFunction) {
    const {cvText, jobDescription} = req.body;

    try{
        if (!req.user) {
            throw new AppError("Unauthorized", 401)
        }

        const response = await optimizeCV(cvText, jobDescription);

        res.status(200).json(response)

    } catch(err) {
        next(err)
    }
}