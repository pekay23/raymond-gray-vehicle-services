import { DisplayHeading, Reveal } from "@/components/public";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "center" | "left";
  size?: "xl" | "lg" | "md";
  tone?: "dark-text" | "light-text";
  className?: string;
}

/** Reusable eyebrow + display heading + optional intro paragraph block. */
export function SectionIntro({
  eyebrow,
  title,
  intro,
  align = "center",
  size = "xl",
  tone = "dark-text",
  className,
}: SectionIntroProps) {
  const onLight = tone === "dark-text";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "font-mono text-[10px] tracking-[0.25em] uppercase",
              onLight ? "text-rg-accent" : "text-rg-invert-ink-soft"
            )}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={100}>
        <DisplayHeading size={size} className={cn("m-0", onLight ? "" : "text-white")}>
          {title}
        </DisplayHeading>
      </Reveal>
      {intro && (
        <Reveal delay={200}>
          <p className={cn("rg-lede m-0", align === "center" && "mx-auto", !onLight && "text-white/80")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
