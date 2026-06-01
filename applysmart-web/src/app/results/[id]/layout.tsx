// Dashboard Layout
import { Footer } from "@/components/landing-page/Footer"
import { Header } from "@/components/landing-page/Header"
import { Metadata } from "next"

// Metadata for result route
export const metadata: Metadata = {
    title: {
        template: "%s || ApplySmart", // %s is used as a placeholder
        default: "Optimization Report || ApplySmart",
    },
    description: "Review your comprehensive AI resume review, tailored ATS match score diagnostics, identified skill gaps, and custom technical learning roadmaps.",
}

export default function ResultLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen bg-[#07080e]">
            <Header />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer />
        </div>
    )
}