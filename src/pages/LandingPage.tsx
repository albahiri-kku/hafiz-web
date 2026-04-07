import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { Footer } from "../components/Footer";

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" style={{ backgroundColor: "#faf0dc" }}>
      <div style={{ height: "1px", width: "60px", backgroundColor: "#d4b896", opacity: 0.6 }} />
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#a38060", opacity: 0.5 }} />
      <div style={{ height: "1px", width: "60px", backgroundColor: "#d4b896", opacity: 0.6 }} />
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <SectionDivider />
        <FeaturesSection />
        <SectionDivider />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
