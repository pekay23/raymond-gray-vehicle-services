import Image from "next/image";
import { SectionShell, DisplayHeading, Reveal } from "@/components/public";
import { SectionIntro } from "./SectionIntro";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id?: string;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: "light" | "muted" | "warm" | "dark";
  /** When set, the section becomes a dark full-bleed image band with white text. */
  backgroundImage?: { src: string; alt: string };
  screenLabel?: string;
}

const colClass: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

/** A bordered grid of titled features. Optionally over a dark image background. */
export function FeatureGrid({
  eyebrow,
  title,
  intro,
  items,
  columns = 4,
  variant = "light",
  backgroundImage,
  screenLabel,
}: FeatureGridProps) {
  const onDark = !!backgroundImage || variant === "dark";
  const border = onDark ? "border-white/20" : "border-rg-line";

  return (
    <SectionShell
      variant={backgroundImage ? "transparent" : variant}
      className="relative overflow-hidden py-(--rg-section-y)"
      data-screen-label={screenLabel}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src={backgroundImage.src} alt={backgroundImage.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ background: "var(--rg-overlay-strong)" }} />
        </div>
      )}

      <div className={cn("relative z-10", onDark && "text-white")}>
        {(title || intro || eyebrow) && (
          <SectionIntro
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            tone={onDark ? "light-text" : "dark-text"}
            className="mb-12 lg:mb-16"
          />
        )}

        <div className={cn("grid grid-cols-1 border-t border-b", colClass[columns], border)}>
          {items.map((item, idx) => (
            <Reveal key={item.id ?? item.title} delay={idx * 80} variant="fade">
              <div
                className={cn(
                  "h-full p-8 lg:p-10 flex flex-col gap-4 border-b last:border-b-0",
                  border,
                  columns === 4 && "lg:border-b-0 lg:border-r lg:last:border-r-0",
                  columns === 3 && "md:border-b-0 md:border-r md:last:border-r-0",
                  columns === 2 && "md:border-b-0 md:border-r md:nth-[2n]:border-r-0"
                )}
              >
                {item.id && (
                  <span className={cn("font-mono text-[11px] tracking-widest", onDark ? "text-rg-accent-light" : "text-rg-accent")}>
                    {item.id}
                  </span>
                )}
                <DisplayHeading as="h3" size="sm" className={cn("m-0", onDark && "text-white")}>
                  {item.title}
                </DisplayHeading>
                <p className={cn("text-sm leading-relaxed", onDark ? "text-white/80" : "text-rg-ink-soft")}>
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
