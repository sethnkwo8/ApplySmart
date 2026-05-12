// Hero section
import { Sparkles } from "lucide-react"

export function Hero() {
    return (
        <section className="pt-36 pb-14 px-6 md:px-12 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary border border-primary/25 bg-primary/8 rounded-full px-4 py-1.5 mb-8">
            <Sparkles size={10} />
            AI-Powered CV Optimization
          </div>
          <h1 className="font-display text-5xl md:text-[4.5rem] font-light leading-[1.08] tracking-tight text-foreground mb-5">
            Your CV, <em className="font-light italic text-primary">perfectly</em>
            <br />matched to the role.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mb-12">
            Paste your CV and a job description. ApplySmart surfaces keyword gaps,
            scores each section, and rewrites your summary to pass the ATS.
          </p>
          <div className="flex items-center justify-center gap-10">
            {(
              [
                ["3,200+", "CVs optimized"],
                ["89%", "avg. match score"],
                ["2×", "more interviews"],
              ] as [string, string][]
            ).map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-light text-foreground">
                  {num}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </section>
    )
}