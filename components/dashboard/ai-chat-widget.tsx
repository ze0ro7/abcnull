"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AiChatWidget() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSend() {
    if (!input.trim()) return

    const userMessage = { role: "user" as const, text: input.trim() };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessages((m) => [
          ...m,
          { role: "assistant", text: `Error: ${errorText}` },
        ]);
        return;
      }

      const { text } = await response.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", text },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
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
          {isLoading && (
            <div className="">
              <span className="inline-block rounded-md px-2 py-1 bg-primary/10">...</span>
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI..."
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            disabled={isLoading}
          />
          <Button size="icon" onClick={onSend} aria-label="Send" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
