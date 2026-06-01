// Dashboard contoller
import { getDashboardData } from "../services/dashboard.service.js";
import { AuthRequest } from "../types/express.js";
import { Response, NextFunction } from "express";

// GET dashboard controller
export async function getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId

        const dashboardData = await getDashboardData(userId!);

        res.status(200).json({
            success: true,
            data: dashboardData
        })

    } catch (err) {
        next(err)
    }
}