import { cn } from "@/lib/utils"

const stats = [
  { label: "PYQs indexed", value: "120k+" },
  { label: "Mock questions", value: "40k+" },
  { label: "Avg. score lift", value: "18%" },
  { label: "Active learners", value: "50k+" },
]

export function StatsSection({ className }: { className?: string }) {
  return (
    <section
      id="stats"
      aria-labelledby="stats-title"
      className={cn("reveal-init bg-background py-16 md:py-24", className)}
    >
      <div className="container mx-auto px-4">
        <header className="max-w-xl mx-auto text-center mb-10">
          <h2 id="stats-title" className="text-2xl md:text-3xl font-semibold text-balance">
            Trusted numbers that keep growing
          </h2>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal-item rounded-xl border border-border/50 bg-card p-5 md:p-6 text-center"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="text-2xl md:text-3xl font-semibold">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
