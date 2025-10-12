import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

const branches = [
  { slug: "cse", label: "Computer Science & Engineering" },
  { slug: "ece", label: "Electronics & Communication Engineering" },
  { slug: "ee", label: "Electrical Engineering" },
  { slug: "me", label: "Mechanical Engineering" },
  { slug: "ce", label: "Civil Engineering" },
  { slug: "che", label: "Chemical Engineering" },
]

export function BranchesGrid() {
  return (
    <section className="reveal-init bg-section">
      <div className="container mx-auto px-4 py-24 sm:py-28">
        <header className="reveal-item mb-10 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-balance">GATE branches</h2>
          <p className="mt-3 text-base text-muted-foreground">Explore PYQs by branch.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {branches.map((b) => (
            <Link
              key={b.slug}
              href="/gate"
              className={cn(
                "group reveal-item rounded-xl border p-6 md:p-7 min-h-[150px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:bg-accent/50 hover:border-primary/30 will-change-transform flex items-center justify-between",
              )}
            >
              <span className="font-medium text-base sm:text-lg text-pretty">{b.label}</span>
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/40 text-foreground/80 transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                aria-hidden="true"
              >
                <ArrowRight className="h-5 w-5" />
              </span>
              <span className="sr-only">{`Open ${b.label}`}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
