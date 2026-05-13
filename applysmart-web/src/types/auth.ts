import { Mail } from "lucide-react";
import { ChangeEvent } from "react";

// Auth field props interface
export interface AuthFieldProps {
    label: string;
    type: string;
    placeholder: string;
    name:string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon: typeof Mail;
    reveal?: boolean;
    onToggleReveal?: () => void;
}

// Interface for signup form
export interface SignupFormType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Interface for sign in form
export interface SigninFormType {
    email: string;
    password: string;
}

// Interface for errors from backend
export interface BackendError {
    errors?: { path: string; message: string }[];
    message?: string;
}