import Link from "next/link";
import { UniverseBackground } from "@/components/sections/universe-background";
export default function JEEPage() {
  return (
    <section className="relative min-h-screen">
        <UniverseBackground />
        <div
            className="absolute inset-0 pointer-events-none dark:opacity-0 opacity-100 mix-blend-multiply"
            aria-hidden="true"
            style={{
                backgroundImage:
                "radial-gradient(800px 800px at 20% 10%, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%), radial-gradient(600px 600px at 80% 20%, rgba(0,0,0,0.04), rgba(0,0,0,0) 60%), repeating-linear-gradient(to bottom, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(to right, rgba(0,0,0,0.02), rgba(0,0,0,0.02) 1px, transparent 1px, transparent 48px)",
            }}
        />
        <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/95 via-background/75 to-background/45"
            aria-hidden="true"
        />
        <div className="relative z-10 flex h-screen flex-col items-center justify-center text-center">
            <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Coming Soon</h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
          We are working hard to bring something amazing for JEE. Stay tuned!
        </p>
        <blockquote className="max-w-[600px] text-muted-foreground md:text-xl/relaxed italic">
        The future belongs to those who believe in the beauty of their dreams.
        </blockquote>
      </div>
    </div>
    </section>
  );
}
