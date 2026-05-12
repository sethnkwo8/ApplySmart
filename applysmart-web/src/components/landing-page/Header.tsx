// Landing page navbar
import { Zap } from "lucide-react"

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 border-b border-border backdrop-blur-xl bg-background/50">
            <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Zap size={14} className="text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-base font-medium tracking-tight text-foreground">
                ApplySmart
            </span>
            </div>
            <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#tool" className="hover:text-foreground transition-colors duration-150">
                Tool
            </a>
            <a href="#how" className="hover:text-foreground transition-colors duration-150">
                How it works
            </a>
            </nav>
            <div className="flex items-center gap-2">
            <button
                className="text-sm px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-border/60 transition-all duration-150"
            >
                Sign in
            </button>
            <button
                className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150"
            >
                Sign up
            </button>
            </div>
        </header>
    )
}