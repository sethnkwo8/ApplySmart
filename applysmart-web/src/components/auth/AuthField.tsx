// Auth field component
"use client"

import { AuthFieldProps } from "@/types/auth";
import { Eye, EyeOff } from "lucide-react";
export function AuthField({
    label,
    type,
    placeholder,
    name,
    value,
    onChange,
    error,
    icon: Icon,
    reveal,
    onToggleReveal,
}: AuthFieldProps) {
    const isPassword = type === "password";
    const inputType = isPassword ? (reveal ? "text" : "password") : type;
    
    return (
        <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {label}
        </label>
        <div className="relative">
            <Icon
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
            type={inputType}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full bg-muted/60 border rounded-xl pl-10 ${
            isPassword ? "pr-10" : "pr-4"
            } py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors duration-150 ${
            error
                ? "border-rose-400/60 focus:border-rose-400"
                : "border-border focus:border-primary/40"
            }`}
            />
            {isPassword && onToggleReveal && (
            <button
                type="button"
                onClick={onToggleReveal}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
                {reveal ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            )}
        </div>
        {error && <p className="text-xs text-rose-400 pl-1">{error}</p>}
        </div>
    );
}