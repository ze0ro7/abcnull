import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const rows = [
  { id: "GATE-2021-Set1", score: 62, accuracy: "78%", date: "2025-09-18" },
  { id: "PYQ-DBMS-2019", score: 71, accuracy: "83%", date: "2025-09-15" },
  { id: "Mock-03", score: 58, accuracy: "74%", date: "2025-09-10" },
]

export function RecentTestsTable() {
  return (
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 ring-1 ring-border">
      <CardHeader>
        <CardTitle>Recent Test Results</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 pr-4">Test</th>
              <th className="py-2 pr-4">Score</th>
              <th className="py-2 pr-4">Accuracy</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="py-2 pr-4">{r.id}</td>
                <td className="py-2 pr-4">{r.score}</td>
                <td className="py-2 pr-4">{r.accuracy}</td>
                <td className="py-2">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
