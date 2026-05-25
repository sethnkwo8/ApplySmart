import { User } from "./auth";
import { OptimizedResultData } from "./optimize";

// How it works steps interface
export interface HowItWorksSteps {
    id: string;
    title: string;
    description: string;
}

// Hero feature type
export type HeroFeature = [string, string];

// Interface for hero features
export interface HeroProps {
    features: HeroFeature[];
}

// Interface for profile dropdown props
export interface ProfileDropdownProps {
    user: User | null;
    logout(): Promise<void>
}

// Views for application
export type View = "input" | "analyzing" | "results"

// Main tool props
export interface MainToolProps {
  onStartAnalyzing: () => void;
  onOptimizationSuccess: (data: OptimizedResultData) => void;
  onOptimizationFailure: () => void;
}