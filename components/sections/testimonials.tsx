export function Testimonials() {
  const list = [
    {
      name: "Mateen",
      title: "Gate Aspirant",
      avatar: "/placeholder-user.jpg",
      text: "The analytics helped me focus on weak topics. Practice felt like the real exam.",
    },
    {
      name: "Shaan",
      title: "Chemical Engineering student",
      avatar: "/placeholder-user.jpg",
      text: "Clean UI and fast filters. I finally stopped wasting time hunting for PYQs.",
    },
    {
      name: "Shujaat",
      title: "Gate Aspirant",
      avatar: "/placeholder-user.jpg",
      text: "AI hints clarified tricky concepts without giving away the full solution.",
    },
    {
      name: "Rayyan",
      title: "ECE student",
      avatar: "/placeholder-user.jpg",
      text: "The detailed performance breakdown is a game-changer. I can track my progress chapter-wise.",
    },
    {
      name: "Sahil",
      title: "Civil Engineering student",
      avatar: "/placeholder-user.jpg",
      text: "Solving papers on a platform that mirrors the actual exam interface boosted my confidence.",
    },
    {
      name: "MARQ",
      title: "Aspirant",
      avatar: "/placeholder-user.jpg",
      text: "The AI-powered doubt clarification is brilliant. It's like having a 24/7 tutor.",
    },
  ]
  return (
    <section className="bg-section">
      <div className="container mx-auto px-4 py-24">
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-center text-balance">
          What students say
        </h2>
        <div
          className="relative mt-12 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex animate-marquee">
            {[...list, ...list].map((t, i) => (
              <figure key={i} className="mx-3 w-full max-w-sm rounded-lg border-3 bg-card p-6 flex-shrink-0">
                <blockquote className="text-base text-pretty">&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div className="text-sm">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-muted-foreground">{t.title}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
