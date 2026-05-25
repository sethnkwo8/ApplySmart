// Optimized results view
import { OptimizedResultProps } from "@/types/optimize"
import { RotateCcw, Download , ExternalLink, BookOpen, X, Check} from "lucide-react"
export function OptimizedResults({data, onReset}: OptimizedResultProps) {
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    
    const matchScore = data.atsScore ?? 0;
    const scoreStatus = matchScore >= 80 ? "Strong match" : matchScore >= 60 ? "Good match" : "Needs work";

    // Helper utility to style semantic importance badges dynamically
    const getWeightStyles = (weight: "low" | "medium" | "high") => {
        switch(weight) {
        case "high": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
        case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        default: return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        }
    };

    return (
        <div className="pt-24 pb-12 px-4">
            {/* Results header */}
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground">
                  Analysis Complete
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Here&apos;s how your CV matches the job description
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={onReset}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-border/60 transition-all duration-150"
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Start over</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150">
                  <Download size={13} />
                  Export CV
                </button>
              </div>
            </div>
            {/* Score and Summary */}
            <div className="grid md:grid-cols-[13rem_1fr] gap-4 mb-4">
              {/* Circle score */}
              <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center">
                <div className="relative w-36 h-36 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                    <circle
                      cx="72"
                      cy="72"
                      r="56"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="9"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="56"
                      fill="none"
                      stroke="#aaff55"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - (matchScore / 100) * circumference}
                      style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-4xl font-light text-primary leading-none">
                      {matchScore}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">/ 100</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">ATS Score</p>
                <p className={`text-xs mt-1 text-center font-medium ${
                    matchScore >= 80 ? "text-primary" : matchScore >= 60 ? "text-amber-400" : "text-rose-400"
                }`}>
                {scoreStatus}
                </p>
              </div>

              {/* Summary */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  Executive Assessment
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.summary}
                </p>
              </div>
            </div>

            {/* Skills Detected */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Check size={14} className="text-primary" />
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Detected Core Skills ({data.detectedSkills?.length ?? 0})
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                    {data.detectedSkills?.map((skill) => (
                    <div
                        key={skill.skillName}
                        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl bg-primary/5 text-foreground border border-border/60"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="font-medium">{skill.skillName}</span>
                        <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${getWeightStyles(skill.importanceWeight)}`}>
                        {skill.importanceWeight}
                        </span>
                    </div>
                    ))}
                </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <X size={14} className="text-rose-400" />
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Missing Skills ({data.missingSkills?.length ?? 0})
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.missingSkills?.map((skill) => (
                  <div
                        key={skill.skillName}
                        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl bg-primary/5 text-foreground border border-border/60"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span className="font-medium">{skill.skillName}</span>
                        <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${getWeightStyles(skill.importanceWeight)}`}>
                        {skill.importanceWeight}
                        </span>
                    </div>
                ))}
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <BookOpen size={14} className="text-primary" />
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Learning Resources
                </p>
              </div>
              <div className="space-y-5">
                {/* Learning Resources */}
                {data.learningResources && data.learningResources.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-5">
                    <BookOpen size={14} className="text-primary" />
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Learning Resources
                    </p>
                    </div>
                    <div className="space-y-6">
                    {data.learningResources.map((resource) => (
                        <div key={resource.skillName} className="border-b border-border/30 last:border-none pb-5 last:pb-0">
                        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Bridging Knowledge Gap: <span className="text-primary capitalize">{resource.skillName}</span>
                        </h4>
                        {/* Responsive columns grid for resources layout */}
                        <div className="grid sm:grid-cols-2 gap-3">
                            {resource.resources.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl border border-border bg-background/40 hover:border-primary/40 hover:bg-muted/20 transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <BookOpen size={13} className="text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                    {link.title}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider font-mono">
                                    Official Documentation
                                    </p>
                                </div>
                                </div>
                                <ExternalLink
                                size={12}
                                className="text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0 ml-2"
                                />
                            </a>
                            ))}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}
              </div>
            </div>
        </div>
    )
}