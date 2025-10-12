import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AISuggestions() {
  const suggestions = [
    "Focus on Algorithms this week (Graph + DP).",
    "Revise Operating Systems: Scheduling and Concurrency.",
    "Practice PYQs 2016-2020 for DBMS and CN.",
  ]
  return (
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 ring-1 ring-border">
      <CardHeader>
        <CardTitle>AI Study Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
