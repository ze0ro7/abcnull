"use client"
import { ClipboardList, Timer, BarChart, Bot } from "lucide-react"

export function Features() {
  const items = [
    {
      title: "Curated PYQs",
      desc: "Indexed by branch, subject, topic, and year for fast discovery.",
      icon: <ClipboardList className="w-8 h-8 mb-4 text-primary" />,
    },
    {
      title: "Realistic mocks",
      desc: "Timed tests with auto-scoring and detailed solutions.",
      icon: <Timer className="w-8 h-8 mb-4 text-primary" />,
    },
    {
      title: "Smart analytics",
      desc: "Find weak topics and track improvement over time.",
      icon: <BarChart className="w-8 h-8 mb-4 text-primary" />,
    },
    {
      title: "AI assistance",
      desc: "Get hints and step-by-step explanations with credits.",
      icon: <Bot className="w-8 h-8 mb-4 text-primary" />,
    },
  ]
  return (
    <section id="features" className="reveal-init bg-card">
      <div className="container mx-auto px-4 py-24 sm:py-28">
        {/* increase section height */}
        <header className="reveal-item mb-12 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
            Everything you need to excel
          </h2>
          <p className="mt-3 text-base text-muted-foreground">Practice smarter with curated content and analytics.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => (
            <article
              key={f.title}
              className="reveal-item group rounded-xl border bg-card p-7 md:p-8 min-h-[260px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:bg-accent/50 hover:border-primary/30 will-change-transform"
            >
              {f.icon}
              <h3 className="font-medium text-xl">{f.title}</h3>
              <p className="mt-3 text-muted-foreground leading-7 text-base">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
