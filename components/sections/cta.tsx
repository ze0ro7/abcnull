import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="reveal-init bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center rounded-2xl border border-border/50 bg-card p-8 md:p-12">
          <div className="inline-flex items-center justify-center rounded-full bg-muted px-3 py-1 text-xs md:text-sm">
            <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" /> Start preparing smarter
          </div>
          <h2 id="cta-title" className="mt-4 text-balance text-3xl md:text-4xl font-semibold">
            Ready to accelerate your exam prep?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Practice real PYQs, take mocks, analyze your progress, and get AI help when you need it.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/signup">Create free account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
