"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Thin accent bar pinned to the top of the viewport that scrubs with page
 * scroll. First concrete GSAP/ScrollTrigger integration on the public site;
 * disabled automatically under prefers-reduced-motion (handled in registerGsap).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const bar = barRef.current;
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left bg-rg-accent"
      ref={barRef}
      style={{ transform: "scaleX(0)" }}
    />
  );
}
