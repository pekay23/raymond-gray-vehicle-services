"use client";

import { DisplayHeading, Reveal } from "@/components/public";
import { CtaRow, type Cta } from "./_shared";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CalloutSlabProps {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  ctas?: Cta[];
  /** Optional checklist card rendered alongside the copy. */
  checklist?: { label?: string; tag?: string; items: string[] };
  screenLabel?: string;
}

export function CalloutSlab({ eyebrow, title, body, ctas, checklist, screenLabel }: CalloutSlabProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-rg-invert-bg text-rg-invert-ink py-(--rg-section-y) px-(--rg-pad-x) overflow-hidden"
      data-screen-label={screenLabel}
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 hidden opacity-20 lg:block"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rg-accent/40 rounded-full blur-[120px] mix-blend-screen translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rg-invert-line/30 rounded-full blur-[100px] mix-blend-screen -translate-x-1/3 translate-y-1/3" />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center max-w-[1600px] mx-auto">
        <Reveal className="lg:col-span-6">
          <div className="flex flex-col gap-8">
            {eyebrow && (
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-rg-accent-ink bg-rg-accent/20 px-4 py-2 rounded-full w-fit">
                {eyebrow}
              </span>
            )}
            <DisplayHeading as="h2" size="xl" className="text-white leading-[1.1] m-0">
              {title}
            </DisplayHeading>
            {body && <p className="text-white/80 text-xl lg:text-2xl m-0 font-light leading-relaxed">{body}</p>}
            {ctas && ctas.length > 0 && <CtaRow ctas={ctas} className="mt-6" />}
          </div>
        </Reveal>

        {checklist && (
          <Reveal delay={300} className="lg:col-span-6">
            <div className="bg-white/5 p-10 lg:p-14 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 mb-10 pb-6 border-b border-white/10 flex justify-between items-end gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                  {checklist.label ?? "Key Features"}
                </span>
                {checklist.tag && (
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-rg-accent-light">{checklist.tag}</span>
                )}
              </div>
              <ul className="relative z-10 flex flex-col gap-6 list-none p-0 m-0">
                {checklist.items.map((item, idx) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex gap-6 items-center text-white/90 text-lg hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-rg-accent-light/25 ring-1 ring-rg-accent-light/40 flex items-center justify-center shrink-0">
                      <span className="text-rg-accent-light font-mono text-sm leading-none pt-0.5">✓</span>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
