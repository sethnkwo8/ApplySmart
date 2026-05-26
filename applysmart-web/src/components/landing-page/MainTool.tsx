// Main tool component
"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { FileText, Upload, Briefcase, Zap, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { sendCvForOptimization } from "@/lib/api/optimize";
import { MainToolProps } from "@/types/landingpage";

export function MainTool({ onOptimizationSuccess, onStartAnalyzing, onOptimizationFailure }: MainToolProps) {
  const router = useRouter();

  // Get user from auth store
  const {user} = useAuthStore();

  // CV text state - Initialized safely from localStorage
  const [cvText, setCvText] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("applysmart_cv_text") || "";
    }
    return "";
  });

  // Job description state - Initialized safely from localStorage
  const [jobDescription, setJobDescription] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("applysmart_job_description") || "";
    }
    return "";
  });

  // Optimizing state
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  // File name state - Initialized safely from localStorage
  const [fileName, setFileName] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("applysmart_file_name");
    }
    return null;
  });

  // Track the actual raw file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Drag over state
  const [dragOver, setDragOver] = useState(false);

  // Check for input values (Including checking fileName to allow re-attachment flow)
  const hasInputValues = (cvText.trim().length > 0 || selectedFile !== null || fileName !== null) && jobDescription.trim().length > 0;

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🚀 Helper sync state utilities
  const handleCvTextChange = (value: string) => {
    setCvText(value);
    localStorage.setItem("applysmart_cv_text", value);
  };

  const handleJobDescChange = (value: string) => {
    setJobDescription(value);
    localStorage.setItem("applysmart_job_description", value);
  };

  // Function to handle file upload
  const handleFileUpload = useCallback((file: File) => {
    setFileName(file.name);
    setSelectedFile(file);
    
    // 🚀 Cache filename string profile
    localStorage.setItem("applysmart_file_name", file.name);

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          handleCvTextChange(e.target.result);
        }
      };
      reader.readAsText(file);
    } else {
      // Clear manual text field cache since file takes structural precedent
      setCvText("");
      localStorage.removeItem("applysmart_cv_text");
      toast.success(`${file.name} attached!`, {
        description: "Our server will extract the text directly during optimization."
      });
    }
  }, []);

  // Function to handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload])

  // Function to handle file clearing
  const handleClearFile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); 
    setFileName(null);
    setSelectedFile(null);
    setCvText("");
    
    // 🚀 Clear local storage items completely
    localStorage.removeItem("applysmart_file_name");
    localStorage.removeItem("applysmart_cv_text");
    
    if (fileInputRef.current) fileInputRef.current.value = ""; 
  }, [])

  // Function to handle optimization
  async function handleOptimizeSubmit() {
    // If not logged in
    if (!user) {
      toast.error("Please sign in or create an account to optimize your CV.", {
          description: "Don't worry, we've saved your progress so you can pick right back up!"
      });
      router.push("/signin");
      return;
    }

    // Guard: If filename was cached from a past session but the browser file buffer is empty
    if (fileName && !selectedFile && cvText.trim().length === 0) {
      toast.error("Please re-attach your resume file.", {
        description: "For data security reasons, files must be re-selected after returning."
      });
      return;
    }

    if (!hasInputValues) {
      toast.error("Please provide both your CV details and the target job description.");
      return;
    }

    onStartAnalyzing(); 
    setIsOptimizing(true);

    try {
        const response = await sendCvForOptimization({
          jobDescription, 
          cvText: selectedFile ? undefined : cvText, 
          cvFile: selectedFile || undefined
        })

        if (response.success) {
          toast.success("CV Analysis Complete!");
          
          // 🚀 Clean up localStorage on complete successful request cycle
          localStorage.removeItem("applysmart_cv_text");
          localStorage.removeItem("applysmart_job_description");
          localStorage.removeItem("applysmart_file_name");

          onOptimizationSuccess(response.data);
        }
    } catch (err: any) {
        toast.error(err?.message || "Analysis pipeline failed. Please retry.");
        setIsOptimizing(false);
        onOptimizationFailure()
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
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
                dragOver
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) =>
                    e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
              {fileName ? (
                  <div className="flex items-center gap-3 px-5 py-4 group/file">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-foreground">
                        {fileName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedFile ? "Ready for extraction — click to swap" : "Click to re-attach file asset"}
                      </p>
                    </div>
                    <button 
                      onClick={handleClearFile}
                      className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
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
                )}
            </div>
            {/* Text area */}
            <textarea
              value={cvText}
              disabled={!!selectedFile} 
              onChange={(e) => handleCvTextChange(e.target.value)}
              placeholder={
                selectedFile 
                  ? "Using uploaded file content for text extraction..." 
                  : "Or paste your CV text here — include your experience, skills, and education..."
              }
              className={`flex-1 min-h-60 w-full bg-card border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/30 transition-colors duration-150 ${
                selectedFile ? "opacity-50 cursor-not-allowed bg-muted/30" : ""
              }`}
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
              onChange={(e) => handleJobDescChange(e.target.value)}
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