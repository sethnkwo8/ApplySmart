// Main tool component
"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { FileText, Upload, Briefcase, Zap, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function MainTool() {
  const router = useRouter();

  // Get user from auth store
  const {user} = useAuthStore();

  // CV text state
  const [cvText, setCvText] = useState<string>("");

  // Job description state
  const [jobDescription, setJobDescription] = useState<string>("")

  // Optimizing state
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const hasInputValues = cvText.trim().length > 0 && jobDescription.trim().length > 0;

  async function handleOptimizeSubmit() {
    // If not logged in
    if (!user) {
      toast.error("Please sign in or create an account to optimize your CV.", {
          description: "We'll save your analysis metrics straight to your profile."
      });
      router.push("/signin");
      return;
    }

    // If not input values
    if (!hasInputValues) {
      toast.error("Please provide both your CV details and the target job description.");
      return;
    }

    // Set optimizing state to true
    setIsOptimizing(true);

    // API call
    try {
        toast.loading("Analyzing keyword weights and compliance metrics...");
        // TODO: Connect your backend POST /api/optimize handler pipeline here
    } catch (err) {
        toast.error("Analysis pipeline failed. Please retry.");
    } finally {
        setIsOptimizing(false);
    }
  }

  return (
      <main id="tool" className="px-6 md:px-12 pb-28 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          {/* CV column */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <FileText size={11} />
              Your CV
            </p>
            {/* Drop zone */}
            <div
              className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer border-border hover:border-muted-foreground/30`}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />
              <div className="flex flex-col items-center py-8 px-4 text-center">
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <Upload size={18} className="text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">
                  Drop your CV here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOCX, or TXT — or paste text below
              </p>
              </div>
            </div>
            {/* Text area */}
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Or paste your CV text here — include your experience, skills, and education..."
              className="flex-1 min-h-60 w-full bg-card border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/30 transition-colors duration-150"
            />
          </div>

          {/* Job description column */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Briefcase size={11} />
              Job Description
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description — include responsibilities, requirements, and any skills listed. More detail gives better results."
              className="flex-1 min-h-80 w-full bg-card border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/30 transition-colors duration-150"
            />
          </div>

          {/* CTA */}
          <div className="md:col-span-2 flex justify-center pt-2">
            <button
              onClick={handleOptimizeSubmit}
              disabled={isOptimizing}
              className={`group flex items-center gap-3 px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 ${
                  hasInputValues 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(170,255,85,0.2)] cursor-pointer active:scale-[0.98]" 
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              }`}
            >
              <Zap size={18} className={isOptimizing ? "animate-pulse text-primary-foreground" : ""} />
              {isOptimizing ? "Processing Alignment..." : "Optimize My CV"}
              {hasInputValues && !isOptimizing && (
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform duration-150"
                />
              )}
            </button>
          </div>
        </div>
    </main>
  )
}