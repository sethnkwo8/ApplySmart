import { steps } from "@/lib/landing-page/howItWorks";

// How it works section
export function HowItWorks() {
    return (
        <section
          id="how"
          className="border-t border-border py-20 px-6 md:px-12"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12 text-center">
              How it works
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              {steps.map((step) => (
                <div key={step.id}>
                  <div className="font-display text-5xl font-light text-primary/12 mb-4 select-none">
                    {step.id}
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
    )
}