export function Testimonials() {
  const list = [
    { name: "Ananya", text: "The analytics helped me focus on weak topics. Practice felt like the real exam." },
    { name: "Rohit", text: "Clean UI and fast filters. I finally stopped wasting time hunting for PYQs." },
    { name: "Meera", text: "AI hints clarified tricky concepts without giving away the full solution." },
  ]
  return (
    <section className="reveal-init bg-section">
      <div className="container mx-auto px-4 py-24">
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-center text-balance">
          What students say
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <figure key={t.name} className="rounded-lg border bg-card p-6">
              <blockquote className="text-base text-pretty">&ldquo;{t.text}&rdquo;</blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
