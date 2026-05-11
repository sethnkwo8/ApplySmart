import mongoose, {Schema, Document} from "mongoose";

export const SkillCategories = [
    "Technology", "Finance", "Marketing", "Healthcare", 
    "Engineering", "Sales", "Education", "Customer Service", 
    "Project Management", "Human Resources", "Design", 
    "Data Analysis", "Operations", "Legal"
] as const;

export type SkillCategory = typeof SkillCategories[number];

export const ImportanceWeights = [
    "low",
    "medium",
    "high"
] as const

export type ImportanceWeight = typeof ImportanceWeights[number]

export interface ILearningResources {
    title: string;
    url: string;
}

export interface ISkill extends Document {
    name: string;
    category: SkillCategory;
    aliases: string[];
    suggestion: string;
    importanceWeight: ImportanceWeight;
    learningResources: ILearningResources[];
}

// Define skill schema
const skillSchema = new Schema<ISkill> ({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    category: {
        type: String,
        enum: SkillCategories,
        required: true
    },
    aliases: {
        type: [String],
        default: []
    },
    suggestion: {
        type: String,
        required: true
    },
    importanceWeight: {
        type: String,
        enum: ImportanceWeights,
        default: "medium"
    },
    learningResources: {
        type: [{
            title: { type: String, required: true },
            url: { type: String, required: true }
        }],
        default: []
    }
}, {
    timestamps: true
})

skillSchema.index({category: 1})
skillSchema.index({name: "text", aliases: "text"})

// Export model
export const Skill =  mongoose.model<ISkill>("Skill", skillSchema)