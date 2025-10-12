import Link from "next/link"
import Image from "next/image"
import { Twitter, Github, Facebook, Dribbble } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-background">
      {/* top grid */}
      <div className="container mx-auto px-4 py-16 grid gap-10 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-3">
          <div className="flex items-center gap-3">
            {/* round logo */}
            <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-border/50">
              <Image
                src="/images/qprep-logo.png"
                alt="Qprep"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="text-lg font-semibold">Qprep</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 text-pretty">
            Practice PYQs and mocks with analytics and AI assistance.
          </p>
        </div>

        {/* About */}
        <nav aria-labelledby="footer-about" className="md:col-span-3">
          <h4 id="footer-about" className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-3">
            About
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/contact">
                Submit an issue
              </Link>
            </li>
            <li>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Repo
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/community">
                Slack/Community
              </Link>
            </li>
          </ul>
        </nav>

        {/* Getting Started */}
        <nav aria-labelledby="footer-getting-started" className="md:col-span-3">
          <h4
            id="footer-getting-started"
            className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-3"
          >
            Getting Started
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/docs/introduction">
                Introduction
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/docs">
                Documentation
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/gate">
                GATE
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/features">
                Features
              </Link>
            </li>
          </ul>
        </nav>

        {/* Resources */}
        <nav aria-labelledby="footer-resources" className="md:col-span-3">
          <h4 id="footer-resources" className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-3">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/api">
                API
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/guides/validation">
                Form Validation
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/accessibility">
                Accessibility
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/community">
                Community
              </Link>
            </li>
            <li>
              <Link className="text-muted-foreground hover:text-foreground" href="/marketplace">
                Marketplace
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social */}
        <div className="md:col-span-12 lg:col-span-3 md:mt-2">
          <h4 className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-3">Social Media</h4>
          <p className="text-sm text-muted-foreground mb-4">Follow us for updates and progress.</p>
          <div className="flex items-center gap-4">
            <Link
              aria-label="Twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              aria-label="GitHub"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              aria-label="Facebook"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              aria-label="Dribbble"
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Dribbble className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="border-t" />

      {/* bottom bar */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Qprep. All rights reserved.</p>
        <nav aria-label="Legal" className="flex items-center gap-6 text-xs text-muted-foreground">
          <Link className="hover:underline underline-offset-4" href="/terms">
            Terms of Service
          </Link>
          <Link className="hover:underline underline-offset-4" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="hover:underline underline-offset-4" href="/security">
            Security
          </Link>
          <Link className="hover:underline underline-offset-4" href="/sitemap">
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  )
}
