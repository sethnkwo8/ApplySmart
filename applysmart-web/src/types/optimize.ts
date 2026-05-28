// Optimize payload
export interface OptimizePayload {
    jobDescription: string;
    cvText?: string;
    cvFile?: File;
}

// Analyze view props interface
export interface AnalyzingViewProps {
  analyzeStep: number;
}

// Mapped Skill interface
export interface MappedSkill {
  skillName: string;
  importanceWeight: "low" | "medium" | "high";
  foundInCv: boolean;
  suggestionText: string;
  skillId?: string;
}

// Resources interface
export interface Resources {
    title: string;
    url: string;
}

// Learning resource interface
export interface LearningResources {
    skillName: string;
    resources: Resources[]
}

// Optimized result data type
export interface OptimizedResultData {
    atsScore: number;       // 🚀 Matches optimizationReport.atsScore
    summary: string;        // 🚀 Matches optimizationReport.summary
    optimizedCvMarkdown: string; // 🚀 Matches optimizationReport.optimizedCvMarkdown
    detectedSkills: MappedSkill[]; // 🚀 Matches optimizationReport.detectedSkills
    missingSkills: MappedSkill[]; // 🚀 Matches optimizationReport.missingSkills
    learningResources: LearningResources[] // 🚀 Matches optimizationReport.learningResources
}

// Interface for Optimized Result props
export interface OptimizedResultProps {
    data: OptimizedResultData;
    onReset(): void;
}