import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { StatsSection } from "@/components/sections/stats"
import { BranchesGrid } from "@/components/sections/branches-grid"
import { Testimonials } from "@/components/sections/testimonials"
import FAQSection from "@/components/sections/faq"
import CTASection from "@/components/sections/cta"
import { SectionRevealController } from "@/components/animations/section-reveal-controller"
import TechShowcase from "@/components/sections/tech-showcase";
import { CoreFeatures } from "@/components/sections/core-features";

export default function HomePage() {
  return (
    <>
      <SectionRevealController>
        <Hero />
        <TechShowcase />
        <Features />
        {/* <HowItWorksSection /> */}
        <CoreFeatures />
        <BranchesGrid />
        <StatsSection />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </SectionRevealController>
    </>
  )
}
