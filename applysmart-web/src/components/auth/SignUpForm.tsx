// Sign up form
"use client"

import { X, Zap, User, Mail, Lock, ChevronLeft } from "lucide-react";
import { AuthField } from "./AuthField";
import { useState } from "react";
import Link from "next/link";

export function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    return (
        <div className="p-7">
            {/* Header */}
            <div className="relative flex items-center justify-center mb-7 h-8"> 
                <Link
                    href="/"
                    className="absolute left-0 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-150"
                >
                    <ChevronLeft size={14} /> 
                </Link>

                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(170,255,85,0.3)]">
                        <Zap size={13} className="text-primary-foreground" strokeWidth={2.5} />
                    </div>
                    <span className="font-display text-base font-medium text-foreground tracking-tight">
                        Create account
                    </span>
                </div>
            </div>

            {/* Google SSO button */}
            <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-muted/30 text-sm text-foreground hover:bg-muted/60 transition-all duration-150 mb-5"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-mono">or</span>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* Form */}
            <form className="space-y-4">
                {/* Name field */}
                <AuthField
                    label="Full name"
                    type="text"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(v) => { setName(v); setErrors((e) => ({ ...e, name: "" })); }}
                    error={errors.name}
                    icon={User}
                />
                {/* Email field */}
                <AuthField
                label="Email address"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: "" })); }}
                error={errors.email}
                icon={Mail}
                />
                {/* Password field */}
                <AuthField
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: "" })); }}
                icon={Lock}
                reveal={showPw}
                onToggleReveal={() => setShowPw((s) => !s)}
                />
                {/* Confirm password field */}
                <AuthField
                    label="Confirm password"
                    type="password"
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={(v) => { setConfirm(v); setErrors((e) => ({ ...e, confirm: "" })); }}
                    icon={Lock}
                    reveal={showConfirm}
                    onToggleReveal={() => setShowConfirm((s) => !s)}
                />
                {/* Submit button */}
                <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-150 shadow-[0_0_24px_rgba(170,255,85,0.15)] mt-1"
                >
                Create my account
                </button>
            </form>

            {/* Switch mode */}
            <p className="text-center text-xs text-muted-foreground mt-5">
                Already have an account?
                <Link
                href="/signin"
                className="text-primary hover:text-primary/80 transition-colors duration-150 font-medium"
                >
                Sign in
                </Link>
            </p>
        </div>
    )
}