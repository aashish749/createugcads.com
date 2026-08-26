import Hero from "../components/Hero";
import Metrics from "../components/Metrics";
import HowItWorks from "../components/HowItWorks";
import Showcase from "../components/Showcase";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Integrations from "../components/Integrations";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import CTA from "../components/CTA";

export default function Home() {
    return (
        <div className="relative overflow-hidden">
            {/* Ambient Background Lighting (Static) */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-[1200px] right-[-200px] w-[600px] h-[600px] bg-indigo-600/8 blur-[160px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-[2800px] left-[-200px] w-[700px] h-[700px] bg-cyan-600/8 blur-[160px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10">
                <Hero />
                <Metrics />
                <HowItWorks />
                <Showcase />
                <Features />
                <Testimonials />
                <Integrations />
                <Pricing />
                <Faq />
                <CTA />
            </div>
        </div>
    );
}