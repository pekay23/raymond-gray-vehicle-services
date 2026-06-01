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
      className="py-(--rg-section-y) relative"
      data-screen-label={screenLabel}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-24 items-start">
        {/* Sticky Image Column */}
        <div 
          className={cn(
            "relative z-0 lg:col-span-5 lg:sticky lg:top-32",
            reverse ? "lg:order-2" : "lg:order-1"
          )}
        >
          <Reveal variant="img" className="relative w-full">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl shadow-2xl bg-rg-bg-3">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                sizes="(max-width:1024px) 100vw, 50vw" 
                className="object-cover transition-transform duration-2000 hover:scale-105" 
                priority={priority} 
              />
            </div>
          </Reveal>
        </div>

        {/* Scrolling Content Column */}
        <div 
          className={cn(
            "relative z-10 flex flex-col gap-8 bg-inherit pt-2 lg:col-span-7 lg:gap-10 lg:pt-0", 
            reverse ? "lg:order-1" : "lg:order-2"
          )}
        >
          <div className="flex flex-col gap-6">
            {eyebrow && (
              <Reveal>
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-rg-accent bg-rg-accent/10 px-3 py-1 rounded-full w-fit">
                  {eyebrow}
                </span>
              </Reveal>
            )}
            <Reveal delay={100}>
              <DisplayHeading as="h2" size="lg" className="m-0 text-rg-ink">
                {title}
              </DisplayHeading>
            </Reveal>
            {body && (
              <Reveal delay={200}>
                <div className="text-xl leading-relaxed text-rg-ink-soft m-0 font-light">{body}</div>
              </Reveal>
            )}
          </div>

          {/* Bento Grid Points */}
          {points && points.length > 0 && (
            <Reveal delay={300} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {points.map((p, i) => (
                  <div
                    key={p}
                    className={cn(
                      "p-6 rounded-2xl border border-rg-line bg-rg-bg-2/50 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-1",
                      i === 0 && points.length % 2 !== 0 ? "sm:col-span-2" : ""
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-rg-accent text-rg-accent-ink flex items-center justify-center mb-4 font-mono text-sm">
                      0{i + 1}
                    </div>
                    <p className="text-rg-ink font-medium m-0">{p}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {ctas && ctas.length > 0 && (
            <Reveal delay={400} className="pt-8">
              <CtaRow ctas={ctas} />
            </Reveal>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
