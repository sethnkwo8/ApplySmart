// Footer section
import { Zap } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border px-6 md:px-12 py-7">
            <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                        <Zap size={10} className="text-primary-foreground" strokeWidth={2.5} />
                    </div>
                    <span className="font-display font-medium text-foreground/80">
                        ApplySmart
                    </span>
                </div>
                <p>© 2026 ApplySmart. All rights reserved.</p>
            </div>
        </footer>
    )
}