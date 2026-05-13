import { Mail } from "lucide-react";

// Auth field props interface
export interface AuthFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
    icon: typeof Mail;
    reveal?: boolean;
    onToggleReveal?: () => void;
}

// Interface for signuu form
export interface SignupFormType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}