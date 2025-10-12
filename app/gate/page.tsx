import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function GatePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">GATE Practice</h1>
        <p className="text-muted-foreground mt-2 text-pretty">
          Filter previous year questions by year, subject, difficulty, and more. Start a timed mock instantly.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Input placeholder="Search subjects or topics" />
        <Select>
          <SelectTrigger aria-label="Select Branch">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cse">CSE</SelectItem>
            <SelectItem value="ece">ECE</SelectItem>
            <SelectItem value="ee">EE</SelectItem>
            <SelectItem value="me">ME</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger aria-label="Select Year">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger aria-label="Select Difficulty">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <article key={i} className="rounded-lg border bg-card p-5">
            <h3 className="font-medium">Mock Test #{i + 1}</h3>
            <p className="text-sm text-muted-foreground mt-1">Mixed PYQs • 60 min • 65 Qs</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Estimated difficulty: Medium</span>
              <Button asChild>
                <Link href={`/test/${i + 1}`}>Start</Link>
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
