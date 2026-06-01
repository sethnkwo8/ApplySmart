// Optimization model
import mongoose, {Schema, Document} from "mongoose";
import { ImportanceWeight, ImportanceWeights, ILearningResources } from "./skills.model.js";

// Matched skill interface
export interface IMatchedSkill {
    skillId: mongoose.Types.ObjectId;
    skillName: string;
    importanceWeight: ImportanceWeight;
    foundInCv: boolean;
    suggestionText: string;
}

// Skill learning interface
export interface ISkillLearningPath {
    skillName: string;
    resources: ILearningResources[];
}

// Enums for Optimization status
export const OptimizationStatuses = [
    "processing",
    "completed",
    "failed"
] as const

// Type for Optimiaztion status
export type OptimizationStatus = typeof OptimizationStatuses[number];

// Interface for model
export interface IOptimized extends Document {
    userId: mongoose.Types.ObjectId;
    fileName?: string;
    fileType?: string;
    fileSize?: number;
    rawCvText: string;
    extractedTextLength?: number;
    jobDescription: string;
    atsScore: number;
    summary: string;
    optimizedCvMarkdown: string;
    missingSkills: IMatchedSkill[];
    detectedSkills: IMatchedSkill[];
    learningResources: ISkillLearningPath[];
    optimizationStatus: OptimizationStatus;
    processingTimeMs?: number;
    modelUsed?: string;
    createdAt: Date;
    updatedAt: Date;
}

const optimizedSchema = new Schema<IOptimized>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    fileName: {
        type: String,
        required: false
    },
    fileType: {
        type: String,
        required: false
    },
    fileSize: {
        type: Number,
        required: false
    },
    rawCvText: {
        type: String,
        required: false
    },
    extractedTextLength: {
        type: Number,
        required: false
    },
    jobDescription: {
        type: String,
        required: false
    },
    atsScore: {
        type: Number,
        required: false,
        min: 0,
        max: 100
    },
    summary: {
        type: String,
        required: false
    },
    optimizedCvMarkdown: {
        type: String,
        required: false
    },
    missingSkills: [{
        skillId: {type: Schema.Types.ObjectId, ref: "Skill", required: false},
        skillName: {type: String, required: true},
        importanceWeight: {type: String, enum: ImportanceWeights, default: "medium"},
        foundInCv: {type: Boolean, required: true},
        suggestionText: {type: String, required: true}
    }],
    detectedSkills: [{
        skillId: {type: Schema.Types.ObjectId, ref: "Skill", required: false},
        skillName: {type: String, required: true},
        importanceWeight: {type: String, enum: ImportanceWeights, default: "medium", required: true},
        foundInCv: {type: Boolean, required: true},
        suggestionText: {type: String, required: true}
    }],
    learningResources: [{
        skillName: { type: String, required: true },
        resources: [{
            title: { type: String, required: true },
            url: { type: String, required: true }
        }]
    }],
    optimizationStatus: {
        type: String,
        enum: OptimizationStatuses,
        default: "processing"
    },
    processingTimeMs: {
        type: Number,
        required: false
    },
    modelUsed: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

optimizedSchema.index({userId: 1, createdAt: -1});

export const Optimization = mongoose.model<IOptimized>("Optimization", optimizedSchema);