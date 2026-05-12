// Auth field props interface
import { Mail } from "lucide-react";

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