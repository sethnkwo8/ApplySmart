// Main tool component
import { FileText, Upload, Briefcase, Zap } from "lucide-react";
export function MainTool() {
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
                placeholder="Paste the full job description — include responsibilities, requirements, and any skills listed. More detail gives better results."
                className="flex-1 min-h-80 w-full bg-card border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/30 transition-colors duration-150"
              />
            </div>

            {/* CTA */}
            <div className="md:col-span-2 flex justify-center pt-2">
              <button
                className={`group flex items-center gap-3 px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 bg-muted text-muted-foreground cursor-not-allowed`}
              >
                <Zap size={18} />
                Optimize My CV
                {/* {canOptimize && (
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform duration-150"
                  />
                )} */}
              </button>
            </div>
          </div>
      </main>
    )
}