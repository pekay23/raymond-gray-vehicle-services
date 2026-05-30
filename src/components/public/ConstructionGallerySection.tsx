"use client";

import { useState } from "react";
import Image from "next/image";
import { DisplayHeading, Reveal, SectionShell } from "@/components/public";
import { cn } from "@/lib/utils";

export function ConstructionGallerySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  // 38 images from i1.webp to i38.webp
  const images = Array.from({ length: 38 }, (_, i) => `/images/gallery/i${i + 1}.webp`);
  
  // Display first 12 images initially, reveal the rest on click.
  const visibleImages = isExpanded ? images : images.slice(0, 12);

  return (
    <SectionShell className="pt-24 pb-32 border-t border-rg-line bg-rg-bg" data-screen-label="Portfolio">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="font-mono text-rg-accent text-[12px] uppercase tracking-widest block mb-4">— In Execution</span>
            <DisplayHeading size="lg" className="m-0">Portfolio &amp; <em>Finishing</em> Works</DisplayHeading>
            <p className="text-rg-ink-soft max-w-2xl mx-auto mt-6 text-base lg:text-lg">
              Direct capture from live and completed sites — showcasing structural execution, interior finishing standards, and final fit-out details.
            </p>
          </div>
        </Reveal>

        {/* Masonry Grid using CSS columns for organic look */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {visibleImages.map((src, index) => (
            <Reveal key={src} delay={index % 4 * 50} variant="fade" className="break-inside-avoid">
              <div className="group relative overflow-hidden bg-neutral-100 border border-rg-line-soft">
                <div className="relative w-full">
                  {/* We don't know exact aspect ratios, so we'll use Next Image with width/height or fill if constrained. 
                      For css columns, it's best to allow native aspect heights. We'll fetch natural dims conceptually or force uniform visual logic. 
                      Wait! Without specified static dims, Next.js requires width/height. 
                      Since we don't know the sizes, we will use an aspect-ratio wrapper to guarantee safe masonry render.
                  */}
                  <div className={cn(
                    "relative w-full overflow-hidden",
                    // Random-looking but deterministic variations based on index for visual rhythm
                    index % 3 === 0 ? "aspect-3/4" : index % 3 === 1 ? "aspect-square" : "aspect-4/5"
                  )}>
                    <Image
                      src={src}
                      alt={`Raymond Gray Construction & Finishing Details`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                      loading={index < 4 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Expand Controls */}
        {!isExpanded && (
          <Reveal className="mt-16 text-center">
            <div className="relative py-8">
              {/* Gradient Fade out above the button */}
              <div className="absolute bottom-full left-0 right-0 h-32 bg-linear-to-t from-rg-bg to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => setIsExpanded(true)}
                className="rg-btn rg-btn-outline z-20 relative"
                aria-label="View full gallery"
              >
                <span>View Full Gallery ({images.length} Images)</span><span>↓</span>
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </SectionShell>
  );
}
