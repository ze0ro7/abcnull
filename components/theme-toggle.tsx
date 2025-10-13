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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    window.localStorage.setItem("qprep-theme", theme)
  }, [theme])

  const themeIcon = theme === "dark" ? "🌙" : "☀️"
  const ariaPressed = mounted ? (theme === "dark") : undefined

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      aria-pressed={ariaPressed}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      <span className="text-sm">{mounted ? themeIcon : null}</span>
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  )
}
