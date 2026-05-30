"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/public";

export function FoundationsSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Tie animation to the section entering/leaving the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth cinematic parallax: significantly reduced zoom to avoid the 'zoomed in' look
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section 
      ref={containerRef}
      style={{ position: "relative" }}
      className="relative flex flex-col lg:block w-full overflow-hidden" 
      data-screen-label="Foundations"
    >
      {/* Image Container: Relative on mobile, Absolute on desktop */}
      <div className="relative h-[45vh] w-full lg:absolute lg:inset-0 lg:z-0 origin-center pointer-events-none">
        <motion.div style={{ scale, y }} className="relative w-full h-full">
          <Image
            src="/images/sections/home/foundations.webp"
            alt="Senior engineer surveying Accra skyline at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
        </motion.div>
      </div>

      {/* Dark Cinematic Overlay: HIDDEN ON MOBILE, ONLY ON DESKTOP */}
      <div className="hidden lg:block absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70 z-10" />

      {/* Content Container: Solid distinct box on mobile, absolute centered overlay on desktop */}
      <div className="relative z-20 bg-rg-bg py-16 lg:py-0 px-(--rg-pad-x) lg:absolute lg:inset-0 w-full lg:flex lg:items-center lg:justify-center lg:bg-transparent">
        <div className="w-full max-w-(--rg-max-w) mx-auto">
          <div className="max-w-4xl">
            <Reveal delay={200} variant="fade">
              <p className="text-[clamp(24px,3vw,40px)] font-light leading-tight text-rg-ink lg:text-white tracking-tight drop-shadow-none lg:drop-shadow-lg">
                Raymond Gray was founded on a powerful principle: property owners, businesses, and
                developers in Ghana deserve the same uncompromising standards found in
                the world&rsquo;s most demanding markets. With <em className="not-italic text-rg-accent-deep lg:text-rg-accent-light font-semibold lg:font-medium">UK-trained engineers</em>{" "}
                and finishing specialists, we bring disciplined, proactive delivery to
                every site &mdash; enhancing asset value, ensuring operational resilience, and creating outstanding work and living environments.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
