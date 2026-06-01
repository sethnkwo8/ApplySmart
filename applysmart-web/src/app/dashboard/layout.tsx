// Dashboard Layout
import { Metadata } from "next"

// Metadata for dashboard route
export const metadata: Metadata = {
    title: {
        template: "%s || ApplySmart", // %s is used as a placeholder
        default: "Analytics || ApplySmart",
    },
    description: "Your centralized workspace for AI-powered resume parsing, historical ATS matching analytics, and personalized technical skill roadmaps.",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    )
}