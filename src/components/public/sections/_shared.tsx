import Link from "next/link";
import { cn } from "@/lib/utils";

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

export function CtaButton({ cta, className }: { cta: Cta; className?: string }) {
  return (
    <Link
      href={cta.href}
      className={cn("rg-btn", variantClass[cta.variant ?? "filled"], className)}
    >
      <span>{cta.label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function CtaRow({ ctas, className }: { ctas?: Cta[]; className?: string }) {
  if (!ctas?.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-3 md:gap-4", className)}>
      {ctas.map((c) => (
        <CtaButton key={c.href + c.label} cta={c} />
      ))}
    </div>
  );
}
