// Optimization item page
"use client"

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchSingleDashboardData } from "@/lib/api/dashboard";
import { OptimizedResults } from "../landing-page/OptimizedResults";
import { Loader2, ArrowLeft, AlertTriangle } from "lucide-react";

export default function SingleOptimizationResults() {
    const router = useRouter();
    const params = useParams();
    const historyId = params.id as string;
    
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!historyId) return;

        const loadHistoricalView = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchSingleDashboardData(historyId);
                setData(response.data); // This populates your UI with the historical text/score!
            } catch (err) {
                console.error("Failed to load history item:", err);
                const errorObject = err as Record<string, any>;
                const errorMessage = errorObject?.message || errorObject?.error || "Failed to load historical record.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadHistoricalView();
    }, [historyId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#07080e]">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                <p className="text-sm text-muted-foreground">Retrieving historical report...</p>
            </div>
        );
    }

    // Error feedback layer
    if (error || !data || !data.matchScore || data.matchScore === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 text-rose-400">
                    <AlertTriangle size={22} />
                </div>
                
                <h3 className="font-display text-xl font-light text-foreground mb-2">
                    Optimization Parsing Failed
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {error || "We encountered an issue retrieving or analyzing this optimization history record. The original payload might be corrupted or formatted improperly."}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                    <button 
                        onClick={() => router.push("/")}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Try New Analysis
                    </button>
                    <button 
                        onClick={() => router.push("/dashboard")}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                        <ArrowLeft size={13} /> Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <OptimizedResults data={data} onReset={() => router.push('/')} />
    );
}