import { ISkill, Skill } from "../models/skills.model.js";

// Extract keywords from job description
export async function extract(jobDescription: string) {
    const normalized = jobDescription.toLowerCase();

    const skills = await Skill.find()

    const foundSkills: ISkill[] = [];

    for (const skill of skills) {
        // check if skill name exists in text
        const hasNameMatch = normalized.includes(skill.name.toLowerCase());

        const hasAliasMatch = skill.aliases.some(alias => 
            normalized.includes(alias.toLowerCase())
        )

        if (hasNameMatch || hasAliasMatch) {
            foundSkills.push(skill)
        }
    }

    return foundSkills
}

// Optimize services
export async function optimizeCV(cvText: string, jobDescription: string) {
    return {
        summary: "Optimized summary",
        experience: ["Improved bulets"],
        skills: ["Skill1"]
    }
}