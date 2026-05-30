import { DisplayHeading, Reveal } from "@/components/public";
import { CtaRow, type Cta } from "./_shared";

interface CalloutSlabProps {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  ctas?: Cta[];
  /** Optional checklist card rendered alongside the copy. */
  checklist?: { label?: string; tag?: string; items: string[] };
  screenLabel?: string;
}

/** Inverted dark slab for emphasis — pairs a statement + CTA with an optional checklist. */
export function CalloutSlab({ eyebrow, title, body, ctas, checklist, screenLabel }: CalloutSlabProps) {
  return (
    <section
      className="relative bg-rg-invert-bg text-white pt-20 pb-(--rg-section-y) px-(--rg-pad-x)"
      data-screen-label={screenLabel}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <Reveal>
          <div className="flex flex-col gap-8">
            {eyebrow && (
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rg-invert-ink-soft">{eyebrow}</span>
            )}
            <DisplayHeading as="h2" size="lg" className="text-white leading-tight m-0">
              {title}
            </DisplayHeading>
            {body && <p className="text-white/75 text-lg lg:text-xl m-0">{body}</p>}
            {ctas && ctas.length > 0 && <CtaRow ctas={ctas} className="mt-2" />}
          </div>
        </Reveal>

        {checklist && (
          <Reveal delay={300}>
            <div className="bg-white/5 p-8 lg:p-12 border border-white/10 backdrop-blur-sm">
              <div className="mb-8 pb-4 border-b border-white/10 flex justify-between items-end gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {checklist.label ?? "Checklist"}
                </span>
                {checklist.tag && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-accent-light">{checklist.tag}</span>
                )}
              </div>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                {checklist.items.map((item) => (
                  <li key={item} className="flex gap-4 items-baseline text-white/85 text-base hover:text-white transition-colors">
                    <span className="text-rg-accent-light font-mono text-xl leading-none">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
