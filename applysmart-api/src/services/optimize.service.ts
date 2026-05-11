import { ISkill, Skill } from "../models/skills.model.js";

// Extract keywords from job description
export async function extractKeywords(jobDescription: string) {
    const normalized = jobDescription.toLowerCase();

    const skills = await Skill.find()

    const foundSkills: ISkill[] = [];

    for (const skill of skills) {
        // check if skill name exists in text
        const hasNameMatch = normalized.includes(skill.name);

        const hasAliasMatch = skill.aliases.some(alias => 
            normalized.includes(alias.toLowerCase())
        )

        if (hasNameMatch || hasAliasMatch) {
            foundSkills.push(skill)
        }
    }

    return foundSkills
}

// Compare cv to job description
export async function compareCVToJob(cvText: string, extractedKeywords: ISkill[]) {
    let message: string | undefined

    if (extractedKeywords.length === 0) {
        message = "No skills found from job description";
        return {
            matchedSkills: [],
            missingSkills: [],
            score: 0,
            message
        };
    } 

    const normalized = cvText.toLowerCase();
    const matchedSkills: ISkill[] = [];

    // Create a set of matched IDs
    const matchedIds = new Set<string>();

    for (const skill of extractedKeywords) {
        const hasNameMatch = normalized.includes(skill.name.toLowerCase());

        const hasAliasMatch = skill.aliases.some(alias => 
            normalized.includes(alias.toLowerCase())
        )

        if (hasNameMatch || hasAliasMatch) {
            matchedSkills.push(skill)
            matchedIds.add(skill._id.toString());
        }
    }

    const score = (matchedSkills.length / extractedKeywords.length) * 100;

    const missingSkills = extractedKeywords.filter(skill => !matchedIds.has(skill._id.toString()))

    return {
        matchedSkills,
        missingSkills,
        score: Math.round(score),
        message
    }
}

// Optimize services
export async function optimizeCV(cvText: string, jobDescription: string) {
    return {
        summary: "Optimized summary",
        experience: ["Improved bulets"],
        skills: ["Skill1"]
    }
}