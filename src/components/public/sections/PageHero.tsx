import Image from "next/image";
import { DisplayHeading, Reveal } from "@/components/public";
import { CtaRow, type Cta } from "./_shared";

interface PageHeroProps {
  /** Small mono eyebrow above/below the title. */
  eyebrow?: string;
  /** Display H1. Wrap key words in <em> for the accent-italic brand motif. */
  title: React.ReactNode;
  lede?: React.ReactNode;
  ctas?: Cta[];
  image: { src: string; alt: string };
  /** data-screen-label for the in-view section tracker in TopNav. */
  screenLabel?: string;
}

/**
 * Full-bleed image hero used at the top of every inner marketing page.
 * Image is a large background slot; copy + CTAs sit on a dark gradient.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  ctas,
  image,
  screenLabel = "Overview",
}: PageHeroProps) {
  return (
    <section className="rg-page-hero" data-screen-label={screenLabel}>
      <div className="rg-hero-media" aria-hidden="true">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
      </div>

      <Reveal variant="line" delay={300}>
        <DisplayHeading as="h1" size="xl">
          {title}
        </DisplayHeading>
      </Reveal>

      <div className="rg-page-hero-bottom grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-end">
        {(eyebrow || lede) && (
          <Reveal delay={500}>
            <div className="flex flex-col gap-4">
              {eyebrow && (
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 m-0">
                  {eyebrow}
                </p>
              )}
              {lede && <p className="rg-lede m-0">{lede}</p>}
            </div>
          </Reveal>
        )}
        <Reveal delay={600} className="flex flex-wrap justify-start lg:justify-end gap-3 md:gap-4">
          <CtaRow ctas={ctas} className="lg:justify-end" />
        </Reveal>
      </div>
    </section>
  );
}
