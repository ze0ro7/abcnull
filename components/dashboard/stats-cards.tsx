import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  const cards = [
    { title: "Accuracy", value: "82%", sub: "Last 30 days" },
    { title: "Tests Attempted", value: "18", sub: "Total attempts" },
    { title: "Weak Topics", value: "Algorithms, DBMS", sub: "Focus this week" },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <Card
          key={c.title}
          className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 ring-1 ring-border"
        >
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{c.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{c.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
