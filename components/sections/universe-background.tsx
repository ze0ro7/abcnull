"use client"

import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  r: number
  a: number
  dx: number
  dy: number
  da: number
  layer: number
}

type ShootingStar = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

export function UniverseBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const DPR = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1

    let widthCss = canvas.offsetWidth
    let heightCss = canvas.offsetHeight
    canvas.width = Math.floor(widthCss * DPR)
    canvas.height = Math.floor(heightCss * DPR)
    ctx.scale(DPR, DPR)

    const isDark = () => document.documentElement.classList.contains("dark")

    // Star density tuned higher for "dense universe"
    const area = widthCss * heightCss
    const BASE_DENSITY = 1 / 500 // higher density than before
    const MAX_STARS = 1700
    const STAR_COUNT = Math.min(Math.floor(area * BASE_DENSITY), MAX_STARS)

    const stars: Star[] = []
    const shooters: ShootingStar[] = []

    // Light-mode UI background motion: subtle animated grid
    let gridOffset = 0

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    function initStars() {
      stars.length = 0
      // Split into layers for parallax
      const LAYERS = 3
      for (let i = 0; i < STAR_COUNT; i++) {
        const layer = Math.floor(Math.random() * LAYERS) // 0,1,2
        const speedFactor = [0.15, 0.35, 0.7][layer]
        stars.push({
          x: Math.random() * widthCss,
          y: Math.random() * heightCss,
          r: rand(0.3, 1.6) * (1 + layer * 0.2),
          a: rand(0.25, 0.9),
          dx: rand(0.02, 0.25) * speedFactor,
          dy: 0,
          da: (Math.random() - 0.5) * 0.015,
          layer,
        })
      }
    }

    function drawNebula() {
      // Soft, low-contrast radial glows; slightly more saturated in dark
      const dark = isDark()
      const blobs = [
        {
          x: widthCss * 0.2,
          y: heightCss * 0.35,
          r: Math.max(widthCss, heightCss) * 0.6,
          colorStops: dark
            ? [
                ["rgba(24,119,242,0.14)", 0],
                ["rgba(11, 11, 11, 0.08)", 0.6],
                ["rgba(2, 2, 2, 0)", 1],
              ]
            : [
                ["rgba(10, 10, 10, 0.12)", 0],
                ["rgba(8, 8, 8, 0.06)", 0.6],
                ["rgba(2, 2, 2, 0)", 1],
              ],
        },
        {
          x: widthCss * 0.8,
          y: heightCss * 0.2,
          r: Math.max(widthCss, heightCss) * 0.45,
          colorStops: dark
            ? [
                ["rgba(5, 5, 5, 0.12)", 0],
                ["rgba(13, 13, 13, 0.06)", 0.65],
                ["rgba(0,0,0,0)", 1],
              ]
            : [
                ["rgba(8, 8, 8, 0.1)", 0],
                ["rgba(0,160,230,0.05)", 0.6],
                ["rgba(255,255,255,0)", 1],
              ],
        },
      ] as const

      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        for (const [c, stop] of b.colorStops) g.addColorStop(stop, c)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawGridLightMode() {
      // Subtle animated grid for light mode only
      const spacing = 40
      const lineColor = "rgba(0,0,0,0.05)"
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1

      const ox = gridOffset % spacing
      const oy = (gridOffset * 0.6) % spacing

      ctx.beginPath()
      for (let x = -ox; x <= widthCss; x += spacing) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, heightCss)
      }
      for (let y = -oy; y <= heightCss; y += spacing) {
        ctx.moveTo(0, y)
        ctx.lineTo(widthCss, y)
      }
      ctx.stroke()
    }

    function spawnShootingStar() {
      // Low probability spawn; avoid too frequent streaks
      if (shooters.length > 2) return
      if (Math.random() < 0.015) {
        const fromTop = Math.random() < 0.5
        shooters.push({
          x: rand(0, widthCss * 0.2),
          y: fromTop ? rand(0, heightCss * 0.4) : rand(heightCss * 0.6, heightCss),
          vx: rand(6, 9),
          vy: fromTop ? rand(2, 4) : rand(-4, -2),
          life: 0,
          maxLife: rand(40, 70),
        })
      }
    }

    function drawShootingStars() {
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i]
        const t = s.life / s.maxLife
        const alpha = isDark() ? 0.9 * (1 - t) : 0.35 * (1 - t)
        const len = 140 * (1 - t)

        // Trail
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 6, s.y - s.vy * 6)
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
        grad.addColorStop(1, `rgba(255,255,255,0)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - (s.vx / 9) * len, s.y - (s.vy / 9) * len)
        ctx.stroke()

        // Head
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2)
        ctx.fill()

        if (!prefersReducedMotion) {
          s.x += s.vx
          s.y += s.vy
          s.life++
        }

        if (s.life > s.maxLife || s.x > widthCss + 50 || s.y < -50 || s.y > heightCss + 50) {
          shooters.splice(i, 1)
        }
      }
    }

    function starColor() {
      // Brighter in dark, subtle in light
      return isDark() ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.28)"
    }

    function drawStars() {
      ctx.fillStyle = starColor()
      for (const s of stars) {
        ctx.globalAlpha = s.a
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()

        if (!prefersReducedMotion) {
          s.x += s.dx
          s.y += s.dy
          s.a += s.da
          if (s.a < 0.18 || s.a > 0.95) s.da *= -1

          // Wrap
          if (s.x - s.r > widthCss) {
            s.x = -s.r
            s.y = rand(0, heightCss)
          }
        }
      }
      ctx.globalAlpha = 1
    }

    function drawFrame() {
      // Clear
      ctx.clearRect(0, 0, widthCss, heightCss)

      // Light-mode animated grid behind everything, very subtle
      if (!isDark()) {
        drawGridLightMode()
        if (!prefersReducedMotion) gridOffset += 0.15
      }

      // Nebula soft glows
      drawNebula()

      // Stars and occasional streaks
      drawStars()
      if (!prefersReducedMotion) {
        spawnShootingStar()
      }
      drawShootingStars()
    }

    const onResize = () => {
      widthCss = canvas.offsetWidth
      heightCss = canvas.offsetHeight
      canvas.width = Math.floor(widthCss * DPR)
      canvas.height = Math.floor(heightCss * DPR)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(DPR, DPR)
      initStars()
      drawFrame()
    }

    const animate = () => {
      drawFrame()
      rafRef.current = requestAnimationFrame(animate)
    }

    initStars()
    drawFrame()
    if (!prefersReducedMotion) {
      animate()
    }

    window.addEventListener("resize", onResize)
    const themeObserver = new MutationObserver(() => {
      // Redraw with new palette immediately
      drawFrame()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      window.removeEventListener("resize", onResize)
      themeObserver.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  )
}
