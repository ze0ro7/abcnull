import Link from "next/link"

export function PricingTeaser() {
  return (
    <section className="reveal-init bg-section-alt">
      <div className="container mx-auto px-4 py-24 bg-popover">
        <div className="rounded-xl border p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:bg-accent/40 hover:border-primary/30">
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight">
              Upgrade for pro analytics and AI explanations
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Unlimited mocks and deep insights to prioritize your next study session.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm font-medium"
          >
            Explore pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
