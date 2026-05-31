"use client";

import Image from "next/image";
import { DisplayHeading, Reveal } from "@/components/public";
import { CtaRow, type Cta } from "./_shared";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export function PageHero({
  eyebrow,
  title,
  lede,
  ctas,
  image,
  screenLabel = "Overview",
}: PageHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax translation
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="rg-immersive-hero relative min-h-[90vh] flex items-center overflow-hidden bg-rg-invert-bg text-rg-invert-ink"
      data-screen-label={screenLabel}
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 w-full h-[120%] top-[-10%]"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-overlay"
        />
        {/* Base darken for legibility across the whole image, plus a stronger bottom gradient. */}
        <div className="absolute inset-0 bg-rg-invert-bg/45" />
        <div className="absolute inset-0 bg-linear-to-t from-rg-invert-bg/95 via-rg-invert-bg/55 to-rg-invert-bg/25" />
      </motion.div>

      <div className="rg-hero-inner relative z-10 w-full px-(--rg-pad-x) pt-32 pb-20 mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Main Title Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Reveal variant="line" delay={200}>
              <DisplayHeading as="h1" size="xl" className="text-white">
                {title}
              </DisplayHeading>
            </Reveal>
          </div>

          {/* Asymmetric Details Column */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:pl-12 lg:border-l border-white/20">
            {(eyebrow || lede) && (
              <Reveal delay={400} className="flex flex-col gap-4">
                {eyebrow && (
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/75 m-0">
                    {eyebrow}
                  </p>
                )}
                {lede && (
                  <p className="text-lg text-white/90 leading-relaxed m-0 font-normal">
                    {lede}
                  </p>
                )}
              </Reveal>
            )}
            
            <Reveal delay={600}>
              <CtaRow ctas={ctas} className="justify-start" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
