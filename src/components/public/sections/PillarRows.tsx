"use client";

import { useState } from "react";
import { SectionShell, DisplayHeading, Reveal } from "@/components/public";
import { SectionIntro } from "./SectionIntro";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

export function PillarRows({
  eyebrow,
  title,
  intro,
  pillars,
  variant = "light",
  screenLabel,
}: PillarRowsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <SectionShell variant={variant} className="py-(--rg-section-y)" data-screen-label={screenLabel}>
      {(title || intro || eyebrow) && (
        <SectionIntro eyebrow={eyebrow} title={title} intro={intro} className="mb-12 lg:mb-20" />
      )}

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {pillars.map((pillar, idx) => {
          const isActive = activeIndex === idx;

          return (
            <Reveal key={idx} delay={idx * 100} variant="fade">
              <motion.div 
                layout
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden",
                  isActive 
                    ? "bg-rg-bg-2 shadow-xl border-rg-accent" 
                    : "bg-rg-bg-2/40 border-rg-line hover:bg-rg-bg-2/80 hover:border-rg-line/80"
                )}
              >
                <motion.div layout className="p-8 lg:p-10 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                      {pillar.label && (
                        <span className="font-mono text-[11px] tracking-widest uppercase text-rg-accent">{pillar.label}</span>
                      )}
                      <DisplayHeading as="h3" size="md" className={cn("m-0 transition-colors", isActive ? "text-rg-ink" : "text-rg-ink-soft")}>
                        {pillar.title}
                      </DisplayHeading>
                    </div>
                    
                    <div className={cn("w-10 h-10 rounded-full border flex items-center justify-center transition-all", isActive ? "bg-rg-accent border-rg-accent text-rg-accent-ink" : "border-rg-line text-rg-ink-soft")}>
                      <motion.svg 
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                        width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.5 12L1.5 6L2.5 5L7.5 10L12.5 5L13.5 6L7.5 12Z" fill="currentColor" />
                      </motion.svg>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 flex flex-col gap-8">
                          {pillar.description && (
                            <p className="m-0 max-w-3xl text-lg text-rg-ink-soft leading-relaxed font-light">{pillar.description}</p>
                          )}
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 list-none p-0 m-0">
                            {pillar.points.map((item) => (
                              <li
                                key={item}
                                className="relative pl-8 py-2 border-b border-rg-line/50 text-rg-ink-soft text-sm flex items-center before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-px before:bg-rg-accent hover:text-rg-ink hover:pl-10 transition-all duration-300"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
