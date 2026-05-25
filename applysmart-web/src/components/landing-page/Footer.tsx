// Footer section
import { Zap } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/40 px-6 md:px-12 py-6 md:py-7 mt-auto bg-background/30 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                
                {/* Brand Logo Wrapper */}
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(170,255,85,0.2)]">
                        <Zap size={10} className="text-primary-foreground" strokeWidth={2.5} />
                    </div>
                    <span className="font-display font-medium text-foreground/80 tracking-wide">
                        ApplySmart
                    </span>
                </div>
                
                {/* Copyright Text */}
                <p className="text-[11px] sm:text-xs tracking-wide text-muted-foreground/60">
                    © 2026 ApplySmart. All rights reserved.
                </p>
                
            </div>
        </footer>
    )
}