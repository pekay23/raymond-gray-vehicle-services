import Image from "next/image";
import { SectionShell, DisplayHeading, Reveal } from "@/components/public";
import { CtaRow, type Cta } from "./_shared";
import { cn } from "@/lib/utils";

interface SplitFeatureProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Optional checklist of supporting points rendered under the body. */
  points?: string[];
  image: { src: string; alt: string };
  ctas?: Cta[];
  /** Place the image on the left instead of the right. */
  reverse?: boolean;
  variant?: "light" | "muted" | "warm";
  screenLabel?: string;
  /** Marks this image as above-the-fold for LCP optimization. */
  priority?: boolean;
}

/** Text paired with a large image slot. Alternates sides via `reverse`. */
export function SplitFeature({
  eyebrow,
  title,
  body,
  points,
  image,
  ctas,
  reverse = false,
  variant = "light",
  screenLabel,
  priority = false,
}: SplitFeatureProps) {
  return (
    <SectionShell
      variant={variant}
      className="py-(--rg-section-y)"
      data-screen-label={screenLabel}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <Reveal variant="img" className={cn("relative", reverse ? "lg:order-2" : "lg:order-1")}>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm bg-rg-bg-3">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority={priority} />
          </div>
        </Reveal>

        <div className={cn("flex flex-col gap-6", reverse ? "lg:order-1" : "lg:order-2")}>
          {eyebrow && (
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-rg-accent">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={100}>
            <DisplayHeading as="h2" size="lg" className="m-0">
              {title}
            </DisplayHeading>
          </Reveal>
          {body && (
            <Reveal delay={200}>
              <div className="rg-lede m-0 text-rg-ink-soft">{body}</div>
            </Reveal>
          )}
          {points && points.length > 0 && (
            <Reveal delay={300}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 list-none p-0 m-0">
                {points.map((p) => (
                  <li
                    key={p}
                    className="relative pl-6 py-2 text-rg-ink-soft text-sm border-b border-rg-line-soft before:content-[''] before:absolute before:left-0 before:top-[18px] before:w-3 before:h-px before:bg-rg-accent"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {ctas && ctas.length > 0 && (
            <Reveal delay={400}>
              <CtaRow ctas={ctas} />
            </Reveal>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
