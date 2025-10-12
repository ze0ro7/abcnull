import { PricingSection } from "@/components/sections/pricing"
import { SectionRevealController } from "@/components/animations/section-reveal-controller"

export default function PricingPage() {
  return (
    <main>
      <SectionRevealController>
        <PricingSection />
      </SectionRevealController>
    </main>
  )
}
