"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/** A single call-to-action used across the marketing section kit. */
export interface Cta {
  label: string;
  href: string;
  /** filled = brand primary, outline = bordered, accent = coral, light = on-dark */
  variant?: "filled" | "outline" | "accent" | "light";
}

const variantClass: Record<NonNullable<Cta["variant"]>, string> = {
  filled: "rg-btn-filled",
  outline: "rg-btn-outline",
  accent: "rg-btn-accent",
  light: "rg-btn-light",
};

function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export function CtaButton({ cta, className }: { cta: Cta; className?: string }) {
  return (
    <MagneticWrapper>
      <Link
        href={cta.href}
        className={cn("rg-btn", variantClass[cta.variant ?? "filled"], className)}
      >
        <span>{cta.label}</span>
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </MagneticWrapper>
  );
}

export function CtaRow({ ctas, className }: { ctas?: Cta[]; className?: string }) {
  if (!ctas?.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {ctas.map((c) => (
        <CtaButton key={c.href + c.label} cta={c} />
      ))}
    </div>
  );
}
