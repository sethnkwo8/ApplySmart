// Landing page navbar
"use client"

import { Zap } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/store/useAuthStore"
import { toast } from "sonner";
import { ProfileDropdown } from "./ProfileDropdown";

export function Header() {
    const {user, isLoading, logout} = useAuthStore();

    // Check if window is defined

    if (isLoading) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 border-b border-border backdrop-blur-xl bg-background/50">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/20 animate-pulse" />
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-8 w-20 bg-muted animate-pulse rounded-lg" />
            </header>
        )
    }

    async function handleLogout() {
        await logout();
        toast.success("Logged out successfully!")
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 border-b border-border backdrop-blur-xl bg-background/50">
            <Link 
                href="/" 
                className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-150 group"
                >
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                    <Zap size={14} className="text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="font-display text-base font-medium tracking-tight text-foreground">
                    ApplySmart
                </span>
            </Link>
            <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#tool" className="hover:text-foreground transition-colors duration-150">
                Tool
            </a>
            <a href="#how" className="hover:text-foreground transition-colors duration-150">
                How it works
            </a>
            </nav>
            <div className="flex items-center gap-2">
                {user ? (
                    <ProfileDropdown user={user} logout={handleLogout} />
                ): (
                    <>
                        <Link
                            href="/signin"
                            className="text-sm px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-border/60 transition-all duration-150"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150"
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}