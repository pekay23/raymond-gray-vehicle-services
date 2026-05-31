import Image from "next/image";
import { SectionShell, Reveal } from "@/components/public";
import { cn } from "@/lib/utils";

export interface Stat {
  value: string;
  label: string;
}

interface StatStripProps {
  stats: Stat[];
  variant?: "light" | "muted" | "warm" | "dark";
  className?: string;
  /** Optional background image rendered as a dark, overlaid texture band. */
  bgImage?: string;
}

/**
 * A row of headline metrics. Use only with figures supported by the source docs
 * (e.g. 60-day guarantee, 180-day support, 3–10yr capital outlook).
 */
export function StatStrip({ stats, variant = "muted", className, bgImage }: StatStripProps) {
  const onDark = variant === "dark" || Boolean(bgImage);
  return (
    <SectionShell variant={bgImage ? "dark" : variant} className={cn("relative overflow-hidden py-16 lg:py-24", className)}>
      {bgImage && (
        <>
          <Image src={bgImage} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-rg-invert-bg/80" />
        </>
      )}
      <div className={cn("relative z-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x", onDark ? "divide-white/15" : "divide-rg-line")}>
        {stats.map((s, idx) => (
          <Reveal key={s.label} delay={idx * 100} variant="fade">
            <div className="px-6 py-6 text-center">
              <div
                className={cn(
                  "font-display font-extrabold leading-none text-[clamp(40px,6vw,72px)]",
                  onDark ? "text-rg-accent-light" : "text-rg-accent"
                )}
              >
                {s.value}
              </div>
              <div
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.2em] mt-4",
                  onDark ? "text-white/75" : "text-rg-ink-mute"
                )}
              >
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
