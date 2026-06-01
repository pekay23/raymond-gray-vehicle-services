"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { SectionShell } from "../SectionShell";
import { DisplayHeading } from "../DisplayHeading";
import { registerGsap, gsap } from "@/lib/gsap";

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface CarouselSectionProps {
  screenLabel?: string;
  eyebrow?: string;
  title: React.ReactNode;
  items: CarouselItem[];
  variant?: "light" | "dark" | "muted";
}

export function CarouselSection({
  screenLabel,
  eyebrow,
  title,
  items,
  variant = "light",
}: CarouselSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    registerGsap();

    // Reduced-motion: skip the pinned horizontal scrub entirely. The CSS class
    // `.rg-carousel-track` falls back to a native horizontally-scrollable strip
    // (see globals.css) so every card stays reachable without motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (!trackRef.current || !sectionRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;

      gsap.to(trackRef.current, {
        x: () => -(trackWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          start: "center center",
          end: () => "+=" + trackWidth,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={sectionRef} className="rg-carousel w-full overflow-hidden relative" data-screen-label={screenLabel}>
      <SectionShell variant={variant} className="rg-carousel-shell w-full min-h-dvh flex flex-col justify-center py-(--rg-section-y)" padded={false}>
        <div className="rg-carousel-head mb-12 lg:mb-20 px-(--rg-pad-x)">
          {eyebrow && (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rg-ink/50 block mb-4">
              {eyebrow}
            </span>
          )}
          <DisplayHeading as="h2" size="xl" className="leading-[1.1]">
            {title}
          </DisplayHeading>
        </div>

        <div className="rg-carousel-track overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-8 lg:gap-12 w-max"
          >
            {/* Start spacer for perfect centering */}
            <div className="shrink-0 w-[calc(50vw-42.5vw)] md:w-[calc(50vw-30vw)] lg:w-[calc(50vw-20vw)] min-w-[calc(50vw-300px)] -mr-8 lg:-mr-12" />

            {items.map((item) => (
              <div
                key={item.id}
                className="w-[85vw] md:w-[60vw] lg:w-[40vw] max-w-[600px] flex flex-col gap-6 shrink-0"
              >
                <div className="rg-carousel-media relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-rg-bg-3 shadow-xl pointer-events-none">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl font-medium mb-3">{item.title}</h3>
                  <p className="text-rg-ink/70 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}

            {/* End spacer for perfect centering */}
            <div className="shrink-0 w-[calc(50vw-42.5vw)] md:w-[calc(50vw-30vw)] lg:w-[calc(50vw-20vw)] min-w-[calc(50vw-300px)] -ml-8 lg:-ml-12" />
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
