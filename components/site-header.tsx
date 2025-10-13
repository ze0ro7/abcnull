'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

const nav = [
  { href: '/gate', label: 'GATE' },
  { href: '/ssc', label: 'SSC' },
  { href: '/jee', label: 'JEE' },
  { href: '/neet', label: 'NEET' },
  { href: '/pricing', label: 'Pricing' },
]

const dashboardNav = [
  { href: '/dashboard/pyqs', label: 'PYQs' },
  { href: '/dashboard/settings', label: 'Settings' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')
  const currentNav = isDashboard ? dashboardNav : nav

  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-full px-4 grid grid-cols-3 items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/qprep-logo.png"
              alt="Qprep logo"
              width={40}
              height={40}
              className="h-9 w-9 rounded-full ring-2 ring-primary/60"
            />
            <span className="font-heading text-lg">Qprep</span>
            <span className="sr-only">Back to home</span>
          </Link>
        </div>
        <nav
          aria-label="Main"
          className="hidden md:flex items-center justify-center gap-6"
        >
          {currentNav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />
          {isDashboard ? (
            <Button asChild variant="ghost">
              <Link href="/auth/logout">Logout</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
