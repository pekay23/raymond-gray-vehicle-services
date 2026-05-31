"use client";

/**
 * Central GSAP setup for the public site.
 *
 * GSAP handles scroll-driven work — scrubbed timelines, pinning, and
 * text/line reveals — while framer-motion stays responsible for component
 * enter/exit and layout animations. Import `gsap` / `ScrollTrigger` from here
 * (never from "gsap" directly in components) so the plugin is registered once
 * and motion preferences are respected globally.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced-motion: disable all scroll-driven motion and reveal
  // any elements that GSAP would otherwise have animated in.
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.globalTimeline.clear();
  }

  registered = true;
}

export { gsap, ScrollTrigger };
