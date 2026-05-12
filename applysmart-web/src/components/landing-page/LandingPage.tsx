// Landing page
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { MainTool } from "./MainTool";

export function LandingPage() {
    return (
        <div
            className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden"
            style={{
                background:
                "radial-gradient(ellipse 90% 55% at 10% -5%, rgba(170,255,85,0.08) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 110%, rgba(80,150,255,0.06) 0%, transparent 55%), #07080e",
            }}
        >
        <Header />
        <Hero />
        <MainTool />
        <HowItWorks />
        <Footer />
        </div>
    )
}