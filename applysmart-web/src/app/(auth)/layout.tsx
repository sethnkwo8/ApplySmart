// Auth Layout
import { Metadata } from "next"

// Metadata for auth routes
export const metadata: Metadata = {
    title: {
        template: "%s || ApplySmart", // %s is used as a placeholder
        default: "Auth || ApplySmart",
    },
    description: "Securely access ApplySmart features",
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
            {children}
        </div>
    )
}