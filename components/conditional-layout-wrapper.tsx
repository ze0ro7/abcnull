"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { ReactNode } from "react"

export function ConditionalLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100dvh-64px-320px)]">{children}</main>
      <SiteFooter />
    </>
  )
}
