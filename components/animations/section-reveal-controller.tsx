"use client"

import { useEffect } from "react"

export default function SectionRevealController() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Observe ALL sections across the document to avoid missing pages that don't wrap in <main>
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section"))

    if (prefersReducedMotion) {
      sections.forEach((el) => {
        el.classList.add("reveal-in")
        el.classList.remove("reveal-init")
      })
      return
    }

    sections.forEach((el) => {
      if (!el.classList.contains("reveal-in")) {
        el.classList.add("reveal-init")
      }
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add("reveal-in")
            el.classList.remove("reveal-init")
            io.unobserve(el)
          }
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.15,
      },
    )

    sections.forEach((el) => io.observe(el))

    // Safety: if IO fails for any reason, reveal after 1.5s so content never stays hidden
    const safety = window.setTimeout(() => {
      sections.forEach((el) => {
        if (el.classList.contains("reveal-init")) {
          el.classList.add("reveal-in")
          el.classList.remove("reveal-init")
        }
      })
    }, 1500)

    return () => {
      window.clearTimeout(safety)
      io.disconnect()
    }
  }, [])

  return null
}
