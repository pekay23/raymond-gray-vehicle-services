"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { SectionShell, DisplayHeading, Reveal } from "@/components/public";
import { registerGsap, gsap } from "@/lib/gsap";

const CAPABILITIES = [
  { num: "01", title: "EV Sales", desc: "Independent sourcing and procurement — any make, matched to your usage and budget.", href: "/#ev-sales" },
  { num: "02", title: "EV Maintenance", desc: "Scheduled PPM, battery-health checks, diagnostics, and responsive repair.", href: "/#ev-maintenance" },
  { num: "03", title: "ICE Servicing", desc: "Heavy and light-duty servicing, diagnostics, and scheduled maintenance.", href: "/#fleet" },
  { num: "04", title: "Fleet Management", desc: "GPS tracking, dispatch optimisation, and monthly fleet reporting.", href: "/#fleet" },
  { num: "05", title: "Charging Infrastructure", desc: "Site assessment, charger specification, and accredited installation.", href: "/#fleet" },
];

/**
 * Editorial "capability index" that replaces the marquee — a numbered list of
 * disciplines that reveals with a GSAP/ScrollTrigger stagger. Uses gsap.from so
 * rows stay visible without JS and under reduced-motion.
 */
export function CapabilityIndex({ screenLabel = "Capabilities" }: { screenLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-cap-row]", {
        yPercent: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell variant="muted" className="py-(--rg-section-y)" data-screen-label={screenLabel}>
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-6">
          <Reveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-rg-accent">What we do</span>
          </Reveal>
          <Reveal delay={100}>
            <DisplayHeading as="h2" size="lg" className="m-0">
              One programme for <em>every</em> vehicle decision.
            </DisplayHeading>
          </Reveal>
          <Reveal delay={200}>
            <p className="rg-lede text-rg-ink-soft m-0">
              From buying the right EV to keeping a mixed fleet on the road — five disciplines, one accountable team.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 flex flex-col border-t border-rg-line">
          {CAPABILITIES.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              data-cap-row
              className="group grid grid-cols-[auto_1fr] gap-6 sm:gap-10 items-baseline py-7 border-b border-rg-line px-3 -mx-3 rounded-sm hover:bg-rg-bg/70 transition-colors"
            >
              <span className="font-mono text-sm text-rg-accent pt-1">{c.num}</span>
              <span className="block">
                <span className="flex items-center gap-3">
                  <DisplayHeading as="h3" size="sm" className="m-0 text-rg-ink group-hover:text-rg-accent transition-colors">
                    {c.title}
                  </DisplayHeading>
                  <span className="text-rg-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true">→</span>
                </span>
                <span className="block mt-2 text-rg-ink-soft text-base max-w-xl leading-relaxed">{c.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
