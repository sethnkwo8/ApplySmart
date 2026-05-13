// Sign up form
"use client"

import { Zap, User, Mail, Lock, ChevronLeft } from "lucide-react";
import { AuthField } from "./AuthField";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackendError, SignupFormType } from "@/types/auth";
import { signUpUser } from "@/lib/api/auth";
import { toast } from "sonner";

export function SignUpForm() {
    // Router for navigation after submit
    const router = useRouter()

    // Form data
    const [formData, setFormData] = useState<SignupFormType>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPw, setShowPw] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    // Loading state
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Password requirements
    const requirements = [
        { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
        { label: "At least one number", test: (pw: string) => /\d/.test(pw) },
        { label: "At least one symbol (@, $, !, etc.)", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
    ];

    // Function to validata inputs
    const validate = () => {
        const e: Record<string, string> = {};
        
        // Name validation
        if (!formData.name.trim()) e.name = "Full name is required.";
        
        // Email Validation
        if (!formData.email.trim()) e.email = "Email address is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email address.";

        // Password Validation
        if (!formData.password) {
            e.password = "Password is required.";
        } else {
            const failedRequirement = requirements.find(req => !req.test(formData.password));
            if (failedRequirement) {
                e.password = failedRequirement.label;
            }
        }

        if (!formData.confirmPassword) {
            e.confirmPassword = "Please confirm your password.";
        } else if (formData.confirmPassword !== formData.password) e.confirmPassword = "Passwords do not match.";

        return e;
    };

    // Function to handle change
    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error while typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[name]
                return newErrors
            })
        }
    }

    // Function to handle form submit
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Validate errors
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Set loading state
        setIsLoading(true)

        // Clear error messages
        setErrors({})

        try{
            // API call
            await signUpUser(formData);

            // Toast success notification
            toast.success("Account created successfully!"); 

            // Navigate to sign in page
            router.push("/signin")
        } catch (err) {
            // Cast err to interface
            const serverError = err as BackendError;

            if (serverError.errors && Array.isArray(serverError.errors)) {
                const backendErrors: Record<string, string> = {};
                
                serverError.errors.forEach((obj) => {
                    backendErrors[obj.path] = obj.message;
                });

                setErrors(backendErrors);
            } else {
                setErrors({ 
                    server: serverError.message || "An unexpected error occurred" 
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

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
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name field */}
                <AuthField
                    label="Full name"
                    type="text"
                    placeholder="Jane Smith"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon={User}
                />
                {/* Email field */}
                <AuthField
                label="Email address"
                type="email"
                placeholder="jane@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={Mail}
                />
                {/* Password field */}
                <AuthField
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={Lock}
                reveal={showPw}
                onToggleReveal={() => setShowPw((s) => !s)}
                />
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 px-1">
                    {requirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <div className={`w-1 h-1 rounded-full ${req.test(formData.password) ? 'bg-primary' : 'bg-muted'}`} />
                            <span className={`text-[10px] uppercase tracking-tighter transition-colors duration-300 ${
                                req.test(formData.password) ? 'text-primary/90' : 'text-muted-foreground'
                            }`}>
                                {req.label}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Confirm password field */}
                <AuthField
                    label="Confirm password"
                    type="password"
                    placeholder="Repeat password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    icon={Lock}
                    reveal={showConfirm}
                    onToggleReveal={() => setShowConfirm((s) => !s)}
                />
                {errors.server && (
                    <p className="text-xs text-rose-400 text-center mb-2 animate-in fade-in slide-in-from-top-1">
                        {errors.server}
                    </p>
                )}
                {/* Submit button */}
                <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-150 shadow-[0_0_24px_rgba(170,255,85,0.15)] mt-1"
                >
                {isLoading ? "Creating account..." : "Create my account"}
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