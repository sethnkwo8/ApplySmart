// Hero section
import { Sparkles } from "lucide-react"
import { features } from "@/lib/landing-page/heroFeatures"

export function Hero() {
    return (
        <section className="pt-36 pb-14 px-6 md:px-12 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary border border-primary/25 bg-primary/8 rounded-full px-4 py-1.5 mb-8">
            <Sparkles size={10} />
            ATS & Skill Match Optimization
          </div>
          <h1 className="font-display text-5xl md:text-[4.5rem] font-light leading-[1.08] tracking-tight text-foreground mb-5">
            Turn your CV into a
            <br />
            <em className="font-light italic text-primary">job-matched</em> application.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            ApplySmart analyzes your CV against any job description, detects missing
            keywords and critical skills, scores your match rate, and gives personalized
            suggestions to improve your chances of passing ATS screenings.
          </p>
          <div className="flex items-center justify-center gap-10">
            {(features).map(([num, label]) => (
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