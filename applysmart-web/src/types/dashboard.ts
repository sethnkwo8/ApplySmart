// Types for dashboard page
import { LearningResources, MappedSkill } from "./optimize";

// Interface for dashboard stats
export interface Stats {
    totalOptimizations: number;
    averageScore: number;
    highestScore: number;
}

// Interface for dashboard history item
export interface HistoryItem {
    id: string;
    score: number;
    date: string;
    cvFileName: string;
    status: string;
    jobTitle: string;
    jobDescription: string;
    rawCvText: string;
    summary: string;
    optimizedCvMarkdown: string;
    missingSkills: MappedSkill[];
    detectedSkills: MappedSkill[];
    learningResources: LearningResources[];
}

// Interface for pagination data
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
}