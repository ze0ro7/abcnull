import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Orbitron } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ConditionalLayoutWrapper } from "@/components/conditional-layout-wrapper"

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-heading", weight: ["400", "600", "700", "800"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${orbitron.variable} antialiased`}>
      <body className={`font-sans`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ConditionalLayoutWrapper>{children}</ConditionalLayoutWrapper>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
