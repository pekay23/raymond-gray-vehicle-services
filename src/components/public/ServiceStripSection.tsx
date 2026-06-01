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
    bgImage: "/images/services/card-technical.webp",
  },
  {
    id: "workplace",
    href: "/services/workplace",
    num: "02 / 03",
    title: "Workplace Support",
    text: "Experience, space planning, front-of-house, moves, security & operational flow.",
    cta: "Explore Workplace",
    bgImage: "/images/services/workplace-1.webp",
  },
  {
    id: "hospitality",
    href: "/services/hospitality",
    num: "03 / 03",
    title: "Hospitality & Housekeeping",
    text: "Presentation, hygiene, catering, boardroom support, events, waste & grounds.",
    cta: "Explore Hospitality",
    bgImage: "/images/new images/womandressingabed.webp",
  },
];

export function ServiceStripSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="rg-three-ways relative overflow-hidden border-b border-rg-line bg-rg-surface transition-colors duration-1000" data-screen-label="Pillars">
      <div className="relative z-10">
        <div className="relative z-10 bg-rg-surface px-(--rg-pad-x) pt-12 pb-4 transition-colors duration-700">
          <Reveal delay={100}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-rg-ink-soft">
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
                  "rg-three-ways-desktop-card rg-three-ways-card group relative hidden h-full flex-col overflow-hidden bg-rg-surface transition-all duration-700 lg:flex lg:border-r lg:p-[clamp(24px,3vw,40px)] last:border-r-0",
                  hoveredId === item.id ? "border-white/20" : "border-rg-line"
                )}
              >
                <div
                  className={cn(
                    "rg-three-ways-bg absolute inset-0 z-0 transition-opacity duration-1000 ease-out-expo",
                    hoveredId === item.id ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Image
                    src={item.bgImage}
                    alt={item.title}
                    fill
                    sizes="33vw"
                    className="object-cover"
                    priority={hoveredId === item.id}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                <div
                  className={cn(
                    "rg-three-ways-solid-bg absolute inset-0 z-0 bg-rg-surface transition-opacity duration-700",
                    hoveredId === item.id ? "opacity-0" : "opacity-100"
                  )}
                />

                <div className="rg-three-ways-copy relative z-10 flex flex-1 flex-col">
                  <div className="flex min-h-[80px] items-center">
                    <DisplayHeading
                      as="h3"
                      size="md"
                      className={cn(
                        "m-0 leading-tight transition-colors duration-500",
                        hoveredId === item.id ? "lg:text-white" : "text-rg-ink lg:group-hover:text-rg-accent"
                      )}
                    >
                      {item.title}
                    </DisplayHeading>
                  </div>

                  <p
                    className={cn(
                      "mb-10 max-w-[32ch] text-sm leading-relaxed text-rg-ink-soft transition-colors duration-700",
                      hoveredId === item.id && "lg:text-white/90"
                    )}
                  >
                    {item.text}
                  </p>

                  <div
                    className={cn(
                      "mt-auto flex items-center justify-between border-t border-rg-line-soft pt-4 font-mono text-[10px] uppercase tracking-widest text-rg-ink-mute transition-all duration-700",
                      hoveredId === item.id && "lg:border-white/30 lg:text-white/80"
                    )}
                  >
                    <span>{item.cta}</span>
                    <span
                      className={cn(
                        "text-rg-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1",
                        hoveredId === item.id && "lg:text-white"
                      )}
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href={item.href}
                className="rg-three-ways-mobile-card group flex h-full flex-col overflow-hidden border-b border-rg-line bg-rg-surface last:border-b-0 lg:hidden"
              >
                <div className="rg-three-ways-mobile-media relative aspect-[4/3] w-full overflow-hidden bg-rg-bg-2">
                  <Image
                    src={item.bgImage}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <div className="rg-three-ways-mobile-copy flex flex-1 flex-col bg-rg-surface p-[clamp(24px,7vw,36px)]">
                  <div className="flex min-h-[64px] items-center">
                    <DisplayHeading as="h3" size="md" className="m-0 leading-tight text-rg-ink">
                      {item.title}
                    </DisplayHeading>
                  </div>

                  <p className="mb-10 max-w-[34ch] text-sm leading-relaxed text-rg-ink-soft">
                    {item.text}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-rg-line-soft pt-4 font-mono text-[10px] uppercase tracking-widest text-rg-ink-mute">
                    <span>{item.cta}</span>
                    <span className="text-rg-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
