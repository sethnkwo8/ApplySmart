// Dashboard service
import mongoose from "mongoose";
import { Optimization } from "../models/optimization.model.js";
import { AppError } from "../utils/AppError.js";

// Function to get data for dashboard
export async function getDashboardData(userId: string) {
    if (!userId) {
        throw new AppError("Unauthorized", 401)
    }

    // Convert userId to mongoose ObjectId
    const convertedUserId = new mongoose.Types.ObjectId(userId)

    // Get history from optimization model newest first
    const history = await Optimization.find({userId: convertedUserId}).sort({createdAt: -1}).lean();

    // Calculate metrics
    const totalOptimizations = history.length;

    let averageScore = 0;
    let highestScore = 0;

    if (totalOptimizations > 0) {
        const totalScore = history.reduce((sum, item) => sum + (item.atsScore || 0), 0);
        averageScore = Math.round(totalScore / totalOptimizations);
        highestScore = Math.max(...history.map(item => item.atsScore || 0));
    }

    // Map fields to match front-end names 
    const formattedHistory = history.map(item => ({
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

    return {
        stats: {
            totalOptimizations,
            averageScore,
            highestScore
        },
        history: formattedHistory
    };
}