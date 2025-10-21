"use client";

import { cn } from "@/lib/utils";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { useEffect, useState, useRef } from "react";

// const stats = [
//   { label: "PYQs questions", value: 7800, suffix: "+" },
//   { label: "Mock questions", value: 3900, suffix: "+" },
//   { label: "Avg. score lift", value: 21, suffix: "%" },
//   { label: "Active learners", value: 50000, suffix: "+" },
// ];

export function StatsSection({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [userCount, setUserCount] = useState(50000);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      const supabase = getSupabaseBrowser();
      const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      setUserCount(count ?? 50000);
    };

    fetchUserCount();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const statItems = [
    { label: "PYQs questions", value: 7800, suffix: "+" },
    { label: "Mock questions", value: 3900, suffix: "+" },
    { label: "Avg. score lift", value: 21, suffix: "%" },
    { label: "Active learners", value: userCount, suffix: "+" },
  ];

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-labelledby="stats-title"
      className={cn("relative bg-background py-20", className)}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <h2 id="stats-title" className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Our Growing Impact
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We are proud of the community we have built and the results our learners have achieved.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-6 bg-card/50 dark:bg-white/10 rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-110 dark:hover:bg-white/20"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="text-4xl md:text-5xl font-heading text-foreground">
                {isVisible ? (
                  <AnimatedNumber value={stat.value} duration={2000} />
                ) : (
                  <span>0</span>
                )}
                {stat.suffix}
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
