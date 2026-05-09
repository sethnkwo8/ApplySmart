// Validator for Optimize
import {z} from "zod";

const cvText = z.string().min(1, "CV text is required")
const jobDescription = z.string().min(1, "Job jobDescription is required")

export const optimizeSchema = z.object({
    cvText,
    jobDescription
})