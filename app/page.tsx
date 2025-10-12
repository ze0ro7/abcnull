import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { StatsSection } from "@/components/sections/stats"
import { BranchesGrid } from "@/components/sections/branches-grid"
import { PricingSection } from "@/components/sections/pricing"
import { Testimonials } from "@/components/sections/testimonials"
import FAQSection from "@/components/sections/faq"
import CTASection from "@/components/sections/cta"
import { SectionRevealController } from "@/components/animations/section-reveal-controller"

export default function HomePage() {
  return (
    <>
      <SectionRevealController>
        <Hero />
        <Features />
        <HowItWorksSection />
        <StatsSection />
        <BranchesGrid />
        <PricingSection />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </SectionRevealController>
    </>
  )
}
