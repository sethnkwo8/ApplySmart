import { GoogleGenAI } from "@google/genai";
import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";
import { Optimization } from "../models/optimization.model.js";
import { Skill } from "../models/skills.model.js";

// Initialize Google AI
const ai = new GoogleGenAI({}) // automatically looks for the GEMINI_API_KEY environment key

export async function optimizeCV(cvText: string, jobDescription: string) {
    // Validate CV text length
    if (cvText.trim().length < 100) {
        throw new AppError("Extracted resume text is too short for optimization.",  400)
    }

    // User prompt
    const userPrompt = `
    === CANDIDATE CV TEXT ===
    ${cvText}

    === TARGET JOB DESCRIPTION ===
    ${jobDescription}
    `;

    try{
        // Generte ai content
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: "You are a specialized technical recruiting engine helping job applicants optimize their CVs against tracking parameters.",
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        atsScore: { type: "INTEGER", description: "Match score from 0 to 100" },
                        summary: { type: "STRING" },
                        detectedSkills: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    skillName: { type: "STRING" },
                                    importanceWeight: { type: "STRING", enum: ["low", "medium", "high"] },
                                    foundInCv: { type: "BOOLEAN" },
                                    suggestionText: { type: "STRING" }
                                },
                                required: ["skillName", "importanceWeight", "foundInCv", "suggestionText"]
                            }
                        },
                        missingSkills: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    skillName: { type: "STRING" },
                                    importanceWeight: { type: "STRING", enum: ["low", "medium", "high"] },
                                    foundInCv: { type: "BOOLEAN" },
                                    suggestionText: { type: "STRING" }
                                },
                                required: ["skillName", "importanceWeight", "foundInCv", "suggestionText"]
                            }
                        }
                    },
                    required: ["atsScore", "summary", "detectedSkills", "missingSkills"]
                }
            }
        });

        // Throw error in no text returned
        if (!response.text) {
            throw new AppError("AI engine returned an empty response block.", 500);
        }

        // return text
        try {
            return JSON.parse(response.text);
        } catch(err) {
            throw new AppError("AI response parsing failed due to malformed structured output.", 500);
        }
    } catch (err: any) {
        console.error(err);
        throw new AppError(err?.message || "Failed to generate AI optimization response.", 500);
    }

}

// Define interface for optimized report
interface IReportInput {
    userId: string;
    cvText: string;
    jobDescription: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string
}
export async function createOptimizationReport(input: IReportInput) {
    // Define start time
    const startTime = Date.now()

    // Create optimization record
    const optimizationReport = await Optimization.create({
        userId: new mongoose.Types.ObjectId(input.userId),
        optimizationStatus: "processing",
        missingSkills: [],
        detectedSkills: []
    })

    try{
        // Get ai result
        const aiResult = await optimizeCV(input.cvText, input.jobDescription);

        // Gather raw skill names from both arrays
        const rawSkillNames = [
            ...aiResult.detectedSkills.map((s: any) => s.skillName),
            ...aiResult.missingSkills.map((s: any) => s.skillName)
        ];

        // Deduplicate and normalize to lowercase to match seeds
        const uniqueSkillNames = Array.from(
            new Set(rawSkillNames.map(name => name.trim().toLowerCase()))
        );

        // Ger matching seeded documentation records
        const dbSkills = await Skill.find({ name: { $in: uniqueSkillNames } });

        // Build a dictionary lookup map
        const skillLookupMap = new Map(
            dbSkills.map(skill => [skill.name.toLowerCase().trim(), skill])
        );

        // Map the MongoDB ObjectIds directly onto the Gemini schema arrays
        const mappedDetectedSkills = aiResult.detectedSkills.map((skill: any) => {
            const dbMatch = skillLookupMap.get(skill.skillName.toLowerCase());
            return {
                skillName: skill.skillName,
                importanceWeight: skill.importanceWeight,
                foundInCv: skill.foundInCv,
                suggestionText: skill.suggestionText,
                skillId: dbMatch ? dbMatch._id : undefined // Get the ID from the full object
            };
        });

        const mappedMissingSkills = aiResult.missingSkills.map((skill: any) => {
            const dbMatch = skillLookupMap.get(skill.skillName.toLowerCase());
            return {
                skillName: skill.skillName,
                importanceWeight: skill.importanceWeight,
                foundInCv: skill.foundInCv,
                suggestionText: skill.suggestionText,
                skillId: dbMatch ? dbMatch._id : undefined // Get the ID from the full object
            };
        });

        // Get learning resources or missing skills
        const aggregatedLearningResources = aiResult.missingSkills
        .map((skill: any) => {
            const dbMatch = skillLookupMap.get(skill.skillName.toLowerCase());
            
            if (dbMatch && dbMatch.learningResources && dbMatch.learningResources.length > 0) {
                return {
                    skillName: dbMatch.name, 
                    resources: dbMatch.learningResources.map((res: any) => ({
                        title: res.title,
                        url: res.url
                    }))
                };
            }
            return null;
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

        // Calculate total execution processing duration
        const processingTimeMs = Date.now() - startTime;

        // Update optimization record
        optimizationReport.fileName = input.fileName;
        optimizationReport.fileType = input.fileType;
        optimizationReport.fileSize = input.fileSize;
        optimizationReport.rawCvText = input.cvText;
        optimizationReport.extractedTextLength = input.cvText.length;
        optimizationReport.jobDescription = input.jobDescription;
        optimizationReport.atsScore = aiResult.atsScore;
        optimizationReport.summary = aiResult.summary;
        optimizationReport.detectedSkills = mappedDetectedSkills;
        optimizationReport.missingSkills = mappedMissingSkills;
        optimizationReport.learningResources = aggregatedLearningResources;
        optimizationReport.optimizationStatus = "completed";
        optimizationReport.processingTimeMs = processingTimeMs;
        optimizationReport.modelUsed = "gemini-2.5-flash";

        await optimizationReport.save()

        return optimizationReport;
    } catch(err: any) {
        optimizationReport.optimizationStatus = "failed";
        await optimizationReport.save();

        // API capacity limits errors
        if (err?.status === 503 || err?.message?.includes("high demand") || err?.message?.includes("UNAVAILABLE")) {
            throw new AppError("Our AI optimization engines are currently experiencing exceptionally high demand. Please wait a minute and click optimize again.", 503);
        }

        throw new AppError(err?.message || "Optimization pipeline failed.", 500)
    }
}