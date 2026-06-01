// Dashboard client component
"use client"

import { Zap, FileText, Target, TrendingUp, Clock, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Footer } from "../landing-page/Footer";
import { useState, useEffect } from "react";
import { Stats, HistoryItem } from "@/types/dashboard";
import { fetchDashboardData } from "@/lib/api/dashboard";
import { PaginationMeta } from "@/types/dashboard";
import { Header } from "../landing-page/Header";

export function Dashboard() {
    // States
    const [stats, setStats] = useState<Stats | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                const response = await fetchDashboardData(currentPage, 5)

                setStats(response?.data?.stats || null);
                setHistory(response?.data?.history || []);
                setPagination(response?.data?.pagination || null);
            } catch (err: any) {
                console.error("Dashboard fetch failed:", err);
                setError(err?.message || "Failed to load dashboard metrics");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [currentPage]);

    return (
        <div
            className="flex flex-col min-h-screen bg-background text-foreground font-sans overflow-x-hidden"
            style={{
                background:
                "radial-gradient(ellipse 90% 55% at 10% -5%, rgba(170,255,85,0.08) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 110%, rgba(80,150,255,0.06) 0%, transparent 55%), #07080e",
            }}
        >
            <Header />
            <div className="mt-28 max-w-7xl mx-auto w-full px-4 md:px-8">
                {/* Dashboard header */}
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-light text-foreground">
                      Dashboard
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your CV optimization history
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150"
                  >
                    <Zap size={13} />
                    New Optimization
                  </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                        <FileText size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Optimizations</p>
                        <p className="font-display text-2xl font-light text-foreground">
                          {stats?.totalOptimizations || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                        <Target size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Average Score</p>
                        <p className="font-display text-2xl font-light text-foreground">
                          {stats?.averageScore || 0}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                        <TrendingUp size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Highest Score</p>
                        <p className="font-display text-2xl font-light text-foreground">
                          {stats?.highestScore || 0}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* History list */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden mb-12">
                  <div className="p-5 border-b border-border">
                    <h3 className="text-sm font-medium text-foreground">Optimization History</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {history.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                            <Clock size={24} className="text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">No optimizations yet</p>
                            <p className="text-xs text-muted-foreground/70 max-w-xs mx-auto">
                            Upload your CV and a job description to get started with your first optimization.
                            </p>
                        </div>
                        ) : (
                        history.map((entry) => (
                            <button
                            key={entry.id}
                            onClick={() => router.push(`/results/${entry.id}`)}
                            className="w-full p-5 hover:bg-muted/30 transition-colors duration-150 text-left group"
                            >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <h4 className="text-sm font-medium text-foreground truncate max-w-md">
                                    {entry.jobTitle}
                                    </h4>
                                    
                                    {/* Score Badge */}
                                    <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                                        entry.score >= 80
                                        ? "bg-primary/15 text-primary"
                                        : entry.score >= 60
                                        ? "bg-amber-400/15 text-amber-400"
                                        : "bg-rose-400/15 text-rose-400"
                                    }`}
                                    >
                                    {entry.score}%
                                    </span>

                                    {/* Status Badge */}
                                    <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                                        entry.status === "completed"
                                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                        : entry.status === "processing"
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                                        : "bg-destructive/10 text-destructive border border-destructive/20"
                                    }`}
                                    >
                                    {entry.status || "completed"}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                    <Clock size={11} />
                                    {new Date(entry.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                    </span>
                                    <span className="flex items-center gap-1.5 truncate">
                                    <FileText size={11} />
                                    {entry.cvFileName}
                                    </span>
                                </div>
                                </div>
                                <ChevronRight
                                size={16}
                                className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1"
                                />
                            </div>
                            </button>
                        ))
                        )}
                    {/* Pagination buttons */}
                    {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-background/20">
                        <p className="text-xs text-muted-foreground">
                        Page <span className="font-medium text-foreground">{pagination.currentPage}</span> of{" "}
                        <span className="font-medium text-foreground">{pagination.totalPages}</span>
                        </p>
                        <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={!pagination.hasPrevPage}
                            className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:hover:bg-background"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={!pagination.hasNextPage}
                            className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:hover:bg-background"
                        >
                            Next
                        </button>
                        </div>
                    </div>
                    )}
                  </div>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}