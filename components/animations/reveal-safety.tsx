"use client"

import { useEffect } from "react"

export default function RevealSafety() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"))

    // Ensure baseline state exists for consistent transitions
    sections.forEach((el) => {
      if (
        !el.classList.contains("reveal-init") &&
        !el.classList.contains("reveal-in") &&
        !el.classList.contains("reveal-show")
      ) {
        el.classList.add("reveal-init")
      }
    })

    const reveal = (el: HTMLElement) => {
      el.classList.add("reveal-show") // works with updated CSS
      el.classList.remove("reveal-init")
    }

    if (prefersReduced) {
      sections.forEach(reveal)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement)
            io.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      },
    )

    sections.forEach((el) => io.observe(el))

    // Fallback: reveal anything still hidden after 1.2s
    const fallback = window.setTimeout(() => {
      sections.forEach((el) => {
        if (el.classList.contains("reveal-init")) {
          // console.log("[v0] Fallback revealing stuck section:", el.id || el.tagName)
          reveal(el)
        }
      })
    }, 1200)

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        sections.forEach((el) => {
          if (el.classList.contains("reveal-init")) reveal(el)
        })
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      window.clearTimeout(fallback)
      document.removeEventListener("visibilitychange", onVisibility)
      io.disconnect()
    }
  }, [])

  return null
}
