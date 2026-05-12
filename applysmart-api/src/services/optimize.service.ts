import { ISkill, Skill, ILearningResources } from "../models/skills.model.js";

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

    // Weighted scores
    const weightPoints: Record<string, number> = {
        high: 5,
        medium: 3,
        low: 1
    };

    let totalPossiblePoints = 0;
    let earnedPoints = 0;

    // Create a set of matched IDs
    const matchedIds = new Set<string>();

    for (const skill of extractedKeywords) {
        // Add possible points to total points
        const skillWeight = weightPoints[skill.importanceWeight] || 1;
        totalPossiblePoints += skillWeight;

        const hasNameMatch = normalized.includes(skill.name.toLowerCase());

        const hasAliasMatch = skill.aliases.some(alias => 
            normalized.includes(alias.toLowerCase())
        )

        if (hasNameMatch || hasAliasMatch) {
            matchedSkills.push(skill)
            matchedIds.add(skill._id.toString());
            // Add weighted points to earnedPoints
            earnedPoints += skillWeight;
        }
    }

    const score = (earnedPoints / totalPossiblePoints) * 100;

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
    const suggestions = new Set<string>();
    let learningResources: ILearningResources[] = [];
    const strengths = new Set<string>();
    const improvements = new Set<string>();

    // Get keywords from job description
    const extractedKeywords = await extractKeywords(jobDescription);

    // Get results from comparing with cv
    const comparedResults = await compareCVToJob(cvText, extractedKeywords);

    const {score, missingSkills, matchedSkills} = comparedResults

    // sort missingSkills
    const sortedMissing = [...missingSkills].sort((a, b) => {
        const weights = { high: 5, medium: 3, low: 1 };
        return weights[b.importanceWeight] - weights[a.importanceWeight];
    });

    for (const missingSkill of sortedMissing) {
        // Add the suggestion
        suggestions.add(missingSkill.suggestion);

        if (missingSkill.learningResources && missingSkill.learningResources.length > 0) {
            learningResources.push(...missingSkill.learningResources);
        }
        
        if (missingSkill.importanceWeight === "high") {
            improvements.add(`Missing Critical Skill: ${missingSkill.name}`);
        }
    }

    for (const matchedSkill of matchedSkills) {        
        if (matchedSkill.importanceWeight === "high") {
            strengths.add(`Strong Match: ${matchedSkill.name}`);
        }
    }

    // Deduplicate learningResources
    const finalResources = Array.from(new Map(learningResources.map(item => [item.url, item])).values());

    return {
        summary: {
            score,
            matchedCount: matchedSkills.length,
            missingCount: missingSkills.length,
            totalKeywordsTracked: matchedSkills.length + missingSkills.length
        },
        matchedSkills: matchedSkills.map(skill => {
            return {
                name: skill.name,
                category: skill.category,
                importanceWeight: skill.importanceWeight
            }
        }),
        missingSkills: missingSkills.map(skill => {
            return {
                name: skill.name,
                category: skill.category,
                importanceWeight: skill.importanceWeight
            }
        }),
        suggestions: Array.from(suggestions),
        strengths: Array.from(strengths),
        improvements: Array.from(improvements),
        resources: finalResources
    }
    
}