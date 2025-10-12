"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Layers, BookOpen, ClipboardList, History, Settings, Gem } from "lucide-react"
import { LogoutButton } from "@/components/auth/logout-button"
import { ThemeToggle } from "@/components/theme-toggle"

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Layers },
  { href: "/dashboard/pyqs", label: "PYQs", icon: BookOpen },
  { href: "/dashboard/mocks", label: "Mocks", icon: ClipboardList },
  { href: "/dashboard/past-tests", label: "Past Tests", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="row-span-2 col-start-1 border-r bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="flex h-16 items-center px-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500" />
          Qprep
        </Link>
      </div>
      <nav className="p-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                "hover:bg-primary/10 transition-colors",
                active ? "bg-primary/15 text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          )
        })}
        <div className="mt-3 p-3">
          <Link
            href="/pricing"
            className={cn(
              "block rounded-md bg-gradient-to-br from-sky-500/20 to-cyan-500/20",
              "ring-1 ring-primary/30 px-3 py-2 text-sm font-medium text-primary",
            )}
          >
            <Gem className="mr-2 inline h-4 w-4" />
            Upgrade to Premium
          </Link>
        </div>
      </nav>
      <div className="mt-auto flex items-center justify-between border-t p-3">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </aside>
  )
}
