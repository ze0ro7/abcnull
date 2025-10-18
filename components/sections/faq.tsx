"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Can I switch between exams like GATE and SSC?",
    a: "Yes. Qprep supports multiple exams with dedicated branches/subjects and filters per exam.",
  },
  {
    q: "Do you provide solutions for PYQs?",
    a: "We include detailed solutions for most questions and AI-assisted hints where available.",
  },
  {
    q: "Is there a free plan?",
    a: "You can explore with limited access. Upgrade anytime for full mocks, analytics, and AI credits.",
  },
  {
    q: "Will my progress sync across devices?",
    a: "Yes, once you sign in, your progress, tests, and analytics remain in sync.",
  },
]

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="reveal-init bg-muted/30 py-20 md:py-28 border-t border-border/50"
    >
      <div className="container mx-auto px-4">
        <header className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <h2 id="faq-title" className="text-balance text-3xl md:text-4xl font-semibold">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground mt-3">Everything you need to know about using Qprep effectively.</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="reveal-item"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <AccordionTrigger className="text-left text-lg font-sans py-6">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
