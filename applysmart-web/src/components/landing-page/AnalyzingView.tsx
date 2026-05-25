"use client"

import React from "react";
import { Zap, Check } from "lucide-react";
import { ANALYZE_STEPS } from "@/lib/landing-page/analyzeSteps";
import { AnalyzingViewProps } from "@/types/optimize";

export function AnalyzingView({ analyzeStep }: AnalyzingViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-128 py-16 px-4 max-w-xl mx-auto transition-all duration-500">
      
      {/* Glow Centerpiece Ring */}
      <div className="relative w-24 h-24 mb-10 group">
        {/* Soft Ambient Glow Drop-Shadow Backing */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
        
        <svg
          className="w-full h-full -rotate-90 relative z-10"
          viewBox="0 0 80 80"
        >
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="rgba(170,255,85,0.06)"
            strokeWidth="3.5"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#aaff55"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 34 * 0.35} ${2 * Math.PI * 34 * 0.65}`}
            className="animate-[spin_1.8s_linear_infinite]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Zap size={26} className="text-primary animate-pulse drop-shadow-[0_0_10px_rgba(170,255,85,0.6)]" />
        </div>
      </div>

      {/* Main Headers Layout */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
          Optimizing Your Resume
        </h2>
        <p className="text-sm text-primary/80 font-mono h-5 transition-all duration-300">
          {analyzeStep < ANALYZE_STEPS.length
            ? ANALYZE_STEPS[analyzeStep]
            : "Assembling your intelligence report..."}
        </p>
      </div>

      {/* Structured Status Tracking Card Container */}
      <div className="w-full bg-[#0d0e16]/60 border border-border/60 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-4">
        {ANALYZE_STEPS.map((step, i) => {
          const isCompleted = i < analyzeStep;
          const isActive = i === analyzeStep;

          return (
            <div
              key={step}
              className={`flex items-center gap-4 text-sm transition-all duration-300 ${
                isCompleted
                  ? "text-muted-foreground/70 line-through decoration-muted-foreground/30"
                  : isActive
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/40"
              }`}
            >
              {/* Dynamic Status Badges */}
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  isCompleted 
                    ? "bg-primary/10 border-primary/20 text-primary" 
                    : isActive 
                    ? "bg-background border-primary shadow-[0_0_10px_rgba(170,255,85,0.15)] text-primary animate-pulse" 
                    : "bg-background/40 border-border/50 text-muted-foreground/20"
                }`}
              >
                {isCompleted ? (
                  <Check size={12} strokeWidth={3} />
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary animate-ping' : 'bg-current'}`} />
                )}
              </div>
              
              <span className={isActive ? "translate-x-0.5 transition-transform duration-300" : ""}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}