// Dashboard service
import mongoose from "mongoose";
import { Optimization } from "../models/optimization.model.js";
import { AppError } from "../utils/AppError.js";

// Function to get data for dashboard
export async function getDashboardData(userId: string, page: number = 1, limit: number = 5) {
    if (!userId) {
        throw new AppError("Unauthorized", 401)
    }

    // Convert userId to mongoose ObjectId
    const convertedUserId = new mongoose.Types.ObjectId(userId)
    const skip = (page - 1) * limit

    // Calculate overall stats across ALL documents for this user
    const allStatsData = await Optimization.find({ userId: convertedUserId }, { atsScore: 1 }).lean();

    // Calculate metrics
    const totalOptimizations = allStatsData.length;

    let averageScore = 0;
    let highestScore = 0;

    if (totalOptimizations > 0) {
        const totalScore = allStatsData.reduce((sum, item) => sum + (item.atsScore || 0), 0);
        averageScore = Math.round(totalScore / totalOptimizations);
        highestScore = Math.max(...allStatsData.map(item => item.atsScore || 0));
    }

    // Fetch only the current page's slice of history documents
    const paginatedHistory = await Optimization.find({ userId: convertedUserId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    // Map fields to match front-end names 
    const formattedHistory = paginatedHistory.map(item => ({
        id: item._id,
        score: item.atsScore || 0,
        date: item.createdAt,
        cvFileName: item.fileName || "Uploaded_CV.pdf",
        status: item.optimizationStatus,
        jobTitle: item.jobDescription ? item.jobDescription.substring(0, 50) + "..." : "Unknown Position",
        jobDescription: item.jobDescription,
        rawCvText: item.rawCvText,
        summary: item.summary,
        optimizedCvMarkdown: item.optimizedCvMarkdown,
        missingSkills: item.missingSkills || [],
        detectedSkills: item.detectedSkills || [],
        learningResources: item.learningResources || [],
        modelUsed: item.modelUsed
    }));

    const totalPages = Math.ceil(totalOptimizations / limit);

    return {
        stats: {
            totalOptimizations,
            averageScore,
            highestScore
        },
        history: formattedHistory,
        pagination: {
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            limit
        }
    };
}