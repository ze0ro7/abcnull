"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

function getPreferredTheme() {
  if (typeof window === "undefined") return "light"
  const stored = window.localStorage.getItem("qprep-theme")
  if (stored === "light" || stored === "dark") return stored
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  return media.matches ? "dark" : "light"
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getPreferredTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    window.localStorage.setItem("qprep-theme", theme)
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      <span className="text-sm">{theme === "dark" ? "🌙" : "☀️"}</span>
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  )
}
