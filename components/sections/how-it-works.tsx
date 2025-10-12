import { cn } from "@/lib/utils"
import { BookOpen, Timer, BarChart3, Brain } from "lucide-react"

export function HowItWorksSection({ className }: { className?: string }) {
  const steps = [
    {
      icon: BookOpen,
      title: "Choose exam & branch",
      desc: "Start with GATE, SSC, JEE, or NEET. Pick your branch or subject focus.",
    },
    {
      icon: Timer,
      title: "Practice PYQs & mocks",
      desc: "Timed tests with auto-scoring and detailed solutions you can trust.",
    },
    {
      icon: BarChart3,
      title: "Track progress",
      desc: "Smart analytics to find weak topics and improve faster with goals.",
    },
    {
      icon: Brain,
      title: "Get AI help",
      desc: "Hints and step-by-step solutions with credits, right when you need them.",
    },
  ]

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className={cn("reveal-init bg-muted/30", "py-20 md:py-28", "border-t border-border/50")}
    >
      <div className="container mx-auto px-4">
        <header className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <h2 id="how-it-works-title" className="text-balance text-3xl md:text-4xl font-semibold">
            How Qprep works
          </h2>
          <p className="text-muted-foreground mt-3">
            A simple path from practice to mastery, optimized for speed and focus.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal-item group rounded-xl border border-border/50 bg-card text-card-foreground p-5 md:p-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
