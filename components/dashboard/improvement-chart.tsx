"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { week: "W1", score: 48 },
  { week: "W2", score: 55 },
  { week: "W3", score: 61 },
  { week: "W4", score: 66 },
  { week: "W5", score: 70 },
  { week: "W6", score: 74 },
]

export function ImprovementChart() {
  return (
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 ring-1 ring-border">
      <CardHeader>
        <CardTitle>Improvement</CardTitle>
      </CardHeader>
      <CardContent className="h-[260px]">
        <ChartContainer className="h-full" config={{ score: { label: "Score", color: "hsl(var(--chart-1))" } }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
