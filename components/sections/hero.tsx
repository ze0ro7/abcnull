import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UniverseBackground } from "./universe-background"

export function Hero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-[100vh] lg:min-h-screen">
      <UniverseBackground />
      <div
        className="absolute inset-0 pointer-events-none dark:opacity-0 opacity-100 mix-blend-multiply"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(800px 800px at 20% 10%, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%), radial-gradient(600px 600px at 80% 20%, rgba(0,0,0,0.04), rgba(0,0,0,0) 60%), repeating-linear-gradient(to bottom, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(to right, rgba(0,0,0,0.02), rgba(0,0,0,0.02) 1px, transparent 1px, transparent 48px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/95 via-background/75 to-background/45"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 py-20 sm:py-28 relative z-10">
        {/* taller vertical rhythm */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-balance bg-gradient-to-r from-teal-300 via-cyan-200 to-lime-300 bg-clip-text text-transparent">
            Crack exams faster with focused PYQs and realistic mocks
          </h1>
          <p className="text-muted-foreground mt-5 text-lg sm:text-xl text-pretty">
            Qprep curates previous-year questions, smart filters, and timed mock tests—plus analytics that show what to
            study next.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/gate">Start practicing</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No credit card needed</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <a
          href="#features"
          aria-label="Scroll to features"
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card/70 backdrop-blur text-foreground/80 transition-colors hover:text-foreground hover:bg-card"
        >
          <svg className="scroll-cue h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 14a1 1 0 0 1-.7-.29l-5-5a1 1 0 1 1 1.4-1.42L10 11.59l4.3-4.3a1 1 0 1 1 1.4 1.42l-5 5A1 1 0 0 1 10 14Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
