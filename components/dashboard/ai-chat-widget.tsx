"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function AIChatWidget() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([])
  const [input, setInput] = useState("")

  function onSend() {
    if (!input.trim()) return
    setMessages((m) => [
      ...m,
      { role: "user", text: input.trim() },
      { role: "assistant", text: "Thanks! I'll help you with that." },
    ])
    setInput("")
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[360px] max-w-[90vw]">
      <Card className="ring-1 ring-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3">
        <div className="max-h-[280px] overflow-y-auto space-y-2 text-sm">
          {messages.length === 0 ? (
            <div className="text-muted-foreground">
              AI helper is ready. Ask anything about PYQs, formulas, or weak topics.
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <span className="inline-block rounded-md px-2 py-1 bg-primary/10">{m.text}</span>
              </div>
            ))
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI..."
            onKeyDown={(e) => e.key === "Enter" && onSend()}
          />
          <Button size="icon" onClick={onSend} aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
