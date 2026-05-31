import Link from "next/link";
import { SectionShell, DisplayHeading, Reveal } from "@/components/public";

const TEASERS: [string, string][] = [
  ["Are you tied to a manufacturer or dealer?", "No — we work for you, sourcing the vehicle that best fits your usage and budget."],
  ["Do you service ICE vehicles too?", "Yes — heavy and light-duty, to the same documented standards as our EV programme."],
  ["Can fleet sit inside our IFM contract?", "Yes — fleet KPIs fold into the same monthly report as your building services."],
];

/** Compact FAQ preview that links through to the full /faqs page. */
export function FaqTeaser({ screenLabel = "FAQs" }: { screenLabel?: string }) {
  return (
    <SectionShell variant="light" className="py-(--rg-section-y)" data-screen-label={screenLabel}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-32">
          <Reveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-rg-accent">Questions</span>
          </Reveal>
          <Reveal delay={100}>
            <DisplayHeading as="h2" size="lg" className="m-0">
              Good questions, <em>answered</em>.
            </DisplayHeading>
          </Reveal>
          <Reveal delay={200}>
            <Link href="/faqs" className="rg-btn rg-btn-outline w-fit">
              <span>See all FAQs</span>
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-8 flex flex-col border-t border-rg-line">
          {TEASERS.map(([q, a], i) => (
            <Reveal key={q} delay={i * 100}>
              <div className="py-7 border-b border-rg-line">
                <DisplayHeading as="h3" size="sm" className="m-0 text-rg-ink">
                  {q}
                </DisplayHeading>
                <p className="mt-3 text-rg-ink-soft max-w-2xl leading-relaxed">{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
