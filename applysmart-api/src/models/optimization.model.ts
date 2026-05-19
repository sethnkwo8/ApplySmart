// Optimization model
import mongoose, {Schema, Document} from "mongoose";
import { ImportanceWeight, ImportanceWeights } from "./skills.model.js";

// Matched skill interface
export interface IMatchedSkill {
    skillId: mongoose.Types.ObjectId;
    skillName: string;
    importanceWeight: ImportanceWeight;
    foundInCv: boolean;
    suggestionText: string;
}

// Enums for Optimization status
export const OptimizationStatuses = [
    "processing",
    "completed",
    "failed"
] as const

// Type for Optimiaztion status
export type OptimiaztionStatus = typeof OptimizationStatuses[number];

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
    matchedSkills: IMatchedSkill[];
    missingSkills: IMatchedSkill[];
    detectedSkills: IMatchedSkill[];
    optimationStatus: OptimiaztionStatus;
    processingTimeMs?: number;
    modelUsed?: string;
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
        required: true
    },
    extractedTextLength: {
        type: Number,
        required: false
    },
    jobDescription: {
        type: String,
        required: true
    },
    atsScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    summary: {
        type: String,
        required: true
    },
    matchedSkills: [{
        skillId: {type: Schema.Types.ObjectId, ref: "Skill", required: false},
        skillName: {type: String, required: true},
        importanceWeight: {type: String, enum: ImportanceWeights, default: "medium"},
        foundInCv: {type: Boolean, required: true},
        suggestionText: {type: String, required: true}
    }],
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
        importanceWeight: {type: String, enum: ImportanceWeights, default: "medium"},
        foundInCv: {type: Boolean, required: true},
        suggestionText: {type: String, required: true}
    }],
    optimationStatus: {
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