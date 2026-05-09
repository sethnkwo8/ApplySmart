import mongoose, {Schema, Document} from "mongoose";

export const SkillCategories = [
    "Technology", "Finance", "Marketing", "Healthcare", 
    "Engineering", "Sales", "Education", "Customer Service", 
    "Project Management", "Human Resources", "Design", 
    "Data Analysis", "Operations", "Legal"
] as const;

export type SkillCategory = typeof SkillCategories[number];

export interface ISkill extends Document {
    name: string;
    category: SkillCategory;
    aliases: string[];
}

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
    aliases: [{
        type: String,
    }]
}, {
    timestamps: true
})

skillSchema.index({category: 1})

export const Skill =  mongoose.model<ISkill>("Skill", skillSchema)