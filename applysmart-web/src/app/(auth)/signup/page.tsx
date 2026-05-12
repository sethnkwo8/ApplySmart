// Signup page
import { SignUpForm } from "@/components/auth/SignUpForm";

// Metadata title
export const metadata = { title: "Sign Up" };

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {/* Card */}
            <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                <SignUpForm />
            </div>
        </div>
    );
}