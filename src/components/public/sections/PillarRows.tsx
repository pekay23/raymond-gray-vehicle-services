import { SectionShell, DisplayHeading, Reveal } from "@/components/public";
import { SectionIntro } from "./SectionIntro";

export interface Pillar {
  label?: string;
  title: React.ReactNode;
  /** Optional intro paragraph shown above the points within the content column. */
  description?: React.ReactNode;
  points: string[];
}

interface PillarRowsProps {
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  pillars: Pillar[];
  variant?: "light" | "muted" | "warm";
  screenLabel?: string;
}

/** Stacked rows: a sticky-feeling title column + a two-column itemised list. */
export function PillarRows({
  eyebrow,
  title,
  intro,
  pillars,
  variant = "light",
  screenLabel,
}: PillarRowsProps) {
  return (
    <SectionShell variant={variant} className="py-(--rg-section-y)" data-screen-label={screenLabel}>
      {(title || intro || eyebrow) && (
        <SectionIntro eyebrow={eyebrow} title={title} intro={intro} className="mb-12 lg:mb-20" />
      )}

      {pillars.map((pillar, idx) => (
        <Reveal key={idx} delay={idx * 120} variant="fade">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-20 pt-12 pb-12 border-t border-rg-line last:border-b">
            <div className="flex flex-col gap-3">
              {pillar.label && (
                <span className="font-mono text-[11px] tracking-widest uppercase text-rg-accent">{pillar.label}</span>
              )}
              <DisplayHeading as="h3" size="md" className="m-0">
                {pillar.title}
              </DisplayHeading>
            </div>
            <div className="flex flex-col gap-6">
              {pillar.description && (
                <p className="m-0 max-w-2xl text-rg-ink-soft leading-relaxed">{pillar.description}</p>
              )}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 list-none p-0 m-0">
                {pillar.points.map((item) => (
                  <li
                    key={item}
                    className="relative pl-6 py-2 border-b border-rg-line-soft last:border-0 before:content-[''] before:absolute before:left-0 before:top-[18px] before:w-3 before:h-px before:bg-rg-ink-mute text-rg-ink-soft text-sm hover:text-rg-ink hover:pl-7 transition-all duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </SectionShell>
  );
}
