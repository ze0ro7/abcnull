"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    blurb: "Get started with 10 full PYQs test series, all analytics, and 10 AI credits.",
    cta: "Start for Free",
    highlighted: false,
    features: [
      "10 PYQs test series unlocked",
      "Full analytics and progress tracking",
      "10 AI credits for explanations",
      "No credit card required",
    ],
  },
  {
    name: "Starter",
    price: "₹40",
    period: "3 months",
    blurb: "Unlock all PYQs (20 years) and 50 AI credits.",
    cta: "Buy 3 months",
    highlighted: false,
    features: [
      "All PYQs test series (20 years)",
      "All analytics & bookmarks",
      "50 AI credits for hints",
      "Priority grading queue",
    ],
  },
  {
    name: "Popular",
    price: "₹70",
    period: "6 months",
    blurb: "All PYQs + 20 mock tests + 200 AI credits.",
    cta: "Buy 6 months",
    highlighted: true,
    badge: "Most popular",
    features: [
      "All PYQs test series (20 years)",
      "20 Mock test series included",
      "200 AI credits for solutions",
      "Advanced analytics & streaks",
    ],
  },
  {
    name: "Pro",
    price: "₹130",
    period: "1 year",
    blurb: "All PYQs + All mocks + Unlimited AI credits.",
    cta: "Buy 1 year",
    highlighted: false,
    features: [
      "All PYQs + All mock test series",
      "Unlimited AI credits",
      "Formula summaries & step-by-step help",
      "Best value for power learners",
    ],
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className={cn("reveal-init relative py-24 md:py-28", "bg-[color:var(--section-alt-bg)]")}
      aria-labelledby="pricing-heading"
    >
      {/* Background sparkle layer for subtle futuristic vibe */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-10 dark:opacity-20",
          "bg-[radial-gradient(1200px_400px_at_50%_-10%,var(--muted-foreground),transparent_60%),radial-gradient(600px_300px_at_90%_10%,var(--primary),transparent_60%)]",
        )}
      />
      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-14">
          <h2 id="pricing-heading" className="font-heading text-balance text-3xl md:text-5xl tracking-tight">
            Simple and Transparent Pricing
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
            Freemium plans tailored for exam prep. Upgrade anytime—keep your progress and analytics.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={cn(
                  "reveal-item relative overflow-hidden group",
                  "border-border/60 bg-background/60 backdrop-blur",
                  "hover:-translate-y-1.5 transition-all duration-300",
                  p.highlighted ? "ring-1 ring-[color:var(--primary)]" : "",
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity",
                    "bg-[radial-gradient(300px_120px_at_50%_-10%,var(--primary),transparent_60%)]",
                  )}
                />
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading text-xl md:text-2xl">{p.name}</CardTitle>
                    {p.badge ? (
                      <Badge variant="secondary" className="rounded-full text-xs md:text-sm">
                        {p.badge}
                      </Badge>
                    ) : null}
                  </div>
                  <CardDescription className="text-sm md:text-base">{p.blurb}</CardDescription>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-heading text-4xl md:text-5xl">{p.price}</span>
                    <span className="text-sm md:text-base text-muted-foreground">/ {p.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button
                    variant={p.highlighted ? "default" : "secondary"}
                    className={cn("w-full", p.highlighted ? "" : "bg-transparent border")}
                    aria-label={p.cta}
                  >
                    {p.cta}
                  </Button>

                  <div className="pt-2">
                    <div className="text-xs md:text-sm text-muted-foreground mb-2">FEATURES</div>
                    <ul className="grid gap-2 text-sm md:text-base">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 rounded-full bg-[color:var(--primary)] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <p className="mt-8 md:mt-10 text-center text-xs md:text-sm text-muted-foreground">
          Prices in INR. AI credits are consumed when you request hints, step-by-step solutions, or summaries.
        </p>
      </div>
    </section>
  )
}
