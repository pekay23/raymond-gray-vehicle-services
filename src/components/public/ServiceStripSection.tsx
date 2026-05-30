"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DisplayHeading, Reveal } from "@/components/public";
import { cn } from "@/lib/utils";

const services = [
  { 
    id: "technical",
    href: "/services/engineering", 
    num: "01 / 03", 
    title: "Technical Services", 
    text: "Engineering-led maintenance, compliance, asset health & lifecycle planning for critical environments.", 
    cta: "Explore Technical",
    bgImage: "/images/services/card-technical.webp"
  },
  { 
    id: "workplace",
    href: "/services/workplace", 
    num: "02 / 03", 
    title: "Workplace Support", 
    text: "Experience, space planning, front-of-house, moves, security & operational flow.", 
    cta: "Explore Workplace",
    bgImage: "/images/services/workplace-1.webp"
  },
  { 
    id: "hospitality",
    href: "/services/hospitality", 
    num: "03 / 03", 
    title: "Hospitality & Housekeeping", 
    text: "Presentation, hygiene, catering, boardroom support, events, waste & grounds.", 
    cta: "Explore Hospitality",
    bgImage: "/images/new images/womandressingabed.webp"
  },
];

export function ServiceStripSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden border-b border-rg-line transition-colors duration-1000 bg-rg-surface" data-screen-label="Pillars">

      {/* Content */}
      <div className="relative z-10">
        <div className="px-(--rg-pad-x) pt-12 pb-4 bg-rg-surface relative z-10 transition-colors duration-700">
          <Reveal delay={100}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-rg-ink-soft">
              — Our Three Ways Of Working
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {services.map((item, i) => (
            <Reveal key={item.href} delay={i * 100} variant="fade" className="h-full">
              <Link 
                href={item.href} 
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "flex flex-col h-full p-[clamp(24px,3vw,40px)] lg:border-r last:border-r-0 transition-all duration-700 group relative overflow-hidden",
                  hoveredId === item.id ? "border-white/20" : "border-rg-line"
                )}
              >
                {/* Column-scoped Background Image */}
                <div 
                  className={cn(
                    "absolute inset-0 z-0 transition-opacity duration-1000 ease-out-expo",
                    hoveredId === item.id ? "opacity-100" : "opacity-100 lg:opacity-0"
                  )}
                >
                  <Image 
                    src={item.bgImage} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    priority={hoveredId === item.id}
                  />
                  {/* Tint overlay to keep text readable */}
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                
                {/* Default Solid Background */}
                <div
                  className={cn(
                    "absolute inset-0 bg-rg-surface transition-opacity duration-700 z-0",
                    hoveredId === item.id ? "opacity-0" : "opacity-0 lg:opacity-100"
                  )}
                />

                <div className="min-h-[80px] flex items-center relative z-10">
                  <DisplayHeading 
                    as="h3" 
                    size="md" 
                    className={cn(
                      "m-0 leading-tight transition-colors duration-500",
                      hoveredId === item.id ? "text-white" : "text-white lg:text-rg-ink lg:group-hover:text-rg-accent"
                    )}
                  >
                    {item.title}
                  </DisplayHeading>
                </div>
                
                <p className={cn(
                  "text-sm leading-relaxed mb-10 max-w-[32ch] transition-colors duration-700 relative z-10",
                  hoveredId === item.id ? "text-white/90" : "text-white/90 lg:text-rg-ink-soft"
                )}>
                  {item.text}
                </p>
                
                <div className={cn(
                  "mt-auto flex justify-between items-center pt-4 border-t font-mono text-[10px] tracking-widest uppercase transition-all duration-700 relative z-10",
                  hoveredId === item.id ? "border-white/30 text-white/80" : "border-white/30 lg:border-rg-line-soft text-white/80 lg:text-rg-ink-mute"
                )}>
                  <span>{item.cta}</span>
                  <span className={cn(
                    "transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1",
                    hoveredId === item.id ? "text-white" : "text-white lg:text-rg-ink"
                  )}>
                    ↗
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
