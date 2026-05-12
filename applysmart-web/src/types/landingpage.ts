// How it works steps interface
export interface HowItWorksSteps {
    id: string;
    title: string;
    description: string;
}

export type HeroFeature = [string, string];

export interface HeroProps {
    features: HeroFeature[];
}