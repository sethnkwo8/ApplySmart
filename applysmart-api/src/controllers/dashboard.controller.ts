// Dashboard contoller
import { getDashboardData } from "../services/dashboard.service.js";
import { AuthRequest } from "../types/express.js";
import { Response, NextFunction } from "express";

// GET dashboard controller
export async function getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId

        // Parse pagination query parameters safely
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;

        const dashboardData = await getDashboardData(userId!, page, limit);

        res.status(200).json({
            success: true,
            data: dashboardData
        })

    } catch (err) {
        next(err)
    }
}