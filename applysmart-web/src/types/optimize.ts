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