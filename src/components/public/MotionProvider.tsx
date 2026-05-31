"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app so every framer-motion animation honours the user's
 * "reduce motion" OS setting (transform/layout animations are reduced).
 * Pair with the GSAP reduced-motion guards in `@/lib/gsap`.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
