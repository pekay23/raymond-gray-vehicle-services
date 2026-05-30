import { SectionShell, DisplayHeading, Reveal } from "@/components/public";
import { SectionIntro } from "./SectionIntro";

export interface TimelineStep {
  phase: string;
  title: string;
  desc: string;
}

interface ProcessTimelineProps {
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  steps: TimelineStep[];
  variant?: "light" | "muted" | "warm";
  screenLabel?: string;
}

/** A vertical, phased timeline with diamond markers on a connecting rule. */
export function ProcessTimeline({
  eyebrow,
  title,
  intro,
  steps,
  variant = "light",
  screenLabel,
}: ProcessTimelineProps) {
  return (
    <SectionShell variant={variant} className="py-(--rg-section-y)" data-screen-label={screenLabel}>
      {(title || intro || eyebrow) && (
        <SectionIntro eyebrow={eyebrow} title={title} intro={intro} className="mb-12 lg:mb-16" />
      )}

      <div className="relative pl-[64px] max-w-4xl mx-auto">
        <div className="absolute top-8 bottom-8 left-[28px] w-px bg-rg-line" aria-hidden="true" />
        <ul className="flex flex-col gap-0 list-none p-0 m-0">
          {steps.map((step, idx) => (
            <Reveal key={step.phase} delay={idx * 100} variant="fade">
              <li className="relative py-6 last:pb-0 group">
                <div className="absolute left-[-42px] top-8 w-2.5 h-2.5 rotate-45 bg-rg-bg border border-rg-accent shadow-[0_0_0_4px_var(--rg-bg)] group-hover:scale-125 transition-transform duration-300" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-rg-accent mb-2 block">{step.phase}</span>
                <DisplayHeading as="h4" size="sm" className="mb-3">
                  {step.title}
                </DisplayHeading>
                <p className="text-rg-ink-soft text-base max-w-2xl">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
