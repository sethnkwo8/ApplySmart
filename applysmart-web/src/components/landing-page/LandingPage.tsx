// Landing page
"use client"
import { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { MainTool } from "./MainTool";
import { View } from "@/types/landingpage";
import { AnalyzingView } from "./AnalyzingView";
import { ANALYZE_STEPS } from "@/lib/landing-page/analyzeSteps";

export function LandingPage() {
    const [view, setView] = useState<View>("input");
    const [analyzeStep, setAnalyzeStep] = useState<number>(0);
    const [reportData, setReportData] = useState<any>(null);

    useEffect(() => {
        if (view !== "analyzing") return;

        const interval = setInterval(() => {
            setAnalyzeStep((prev) => {
                if (prev < ANALYZE_STEPS.length) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [view]);

    const handleStartAnalyzing = () => {
        setAnalyzeStep(0);
        setView("analyzing");
    };

    const handleOptimizationSuccess = (data: any) => {
        setReportData(data);
        setAnalyzeStep(ANALYZE_STEPS.length);
        
        setTimeout(() => {
            setView("results");
        }, 1200);
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-background text-foreground font-sans overflow-x-hidden"
            style={{
                background:
                "radial-gradient(ellipse 90% 55% at 10% -5%, rgba(170,255,85,0.08) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 110%, rgba(80,150,255,0.06) 0%, transparent 55%), #07080e",
            }}
        >
            <Header />

            {/* Different views */}

            {/* Input view */}
            {view === "input" ? (
                <div className="w-full">
                    <Hero />
                    <MainTool onStartAnalyzing={handleStartAnalyzing} onOptimizationSuccess={handleOptimizationSuccess} />
                    <HowItWorks />
                </div>
            ) : (
                <main className="flex-1 flex flex-col justify-center items-center px-4 w-full">
                    {/* Analyzing view */}
                    {view === "analyzing" && (
                        <AnalyzingView analyzeStep={analyzeStep}/>
                    )}
                    {/* Results view */}
                    {view === "results" && (
                        <div className="text-white font-mono text-xs">Results View Mount Target Placeholder</div>
                    )}
                </main>
            )}

            <Footer />
        </div>
    )
}