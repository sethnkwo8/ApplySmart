// Dashboard Layout
import { Metadata } from "next"

// Metadata for dashboard route
export const metadata: Metadata = {
    title: {
        template: "%s || ApplySmart", // %s is used as a placeholder
        default: "Dashboard || ApplySmart",
    },
    description: "",
}

export default function DashboardLayout({
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