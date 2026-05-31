"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * In-page section navigation (scroll-spy rail). Auto-discovers sections marked
 * with `data-screen-label` in the page <main>, highlights the active one, and
 * smooth-scrolls on click. This is the home page's section-jumping mechanism —
 * the overlay menu is reserved for page-to-page navigation.
 *
 * Fixed to the right edge on wide screens only. Uses mix-blend-difference so the
 * monochrome ticks/labels stay legible over both light and dark sections.
 */
export function SectionNav() {
  const [labels, setLabels] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const elsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("main [data-screen-label]")
    );
    elsRef.current = els;
    setLabels(els.map((e) => e.getAttribute("data-screen-label") || ""));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const go = useCallback((i: number) => {
    const el = elsRef.current[i];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }, []);

  if (labels.length < 3) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex-col items-end gap-3 mix-blend-difference text-white"
    >
      {labels.map((label, i) => {
        const isActive = active === i;
        return (
          <button
            key={label + i}
            type="button"
            onClick={() => go(i)}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center justify-end gap-3 cursor-pointer"
          >
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300",
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "h-px transition-all duration-300",
                isActive ? "w-9 bg-white" : "w-4 bg-white/40 group-hover:w-6 group-hover:bg-white/80"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
