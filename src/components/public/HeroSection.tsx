"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { DisplayHeading, Reveal } from "@/components/public";

export function HeroSection() {
  const { scrollY } = useScroll();
  
  // Parallax effects: Image moves down slowly and fades out as user scrolls
  const y = useTransform(scrollY, [0, 1000], ["0%", "30%"]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0.2]);

  return (
    <>
      <section
        className="relative flex flex-col lg:h-screen lg:justify-end overflow-hidden bg-rg-invert-bg pt-0"
        data-screen-label="Overview"
      >
        {/* Image container: Relative on mobile, Absolute parallax on desktop */}
        <motion.div 
          className="relative h-[45vh] w-full lg:absolute lg:inset-0 lg:h-full lg:z-0 origin-top" 
          aria-hidden="true"
          style={{ y, opacity }}
        >
          <Image 
            src="/images/heros/hero-home.webp" 
            alt="Integrated Facility Management" 
            fill 
            priority 
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Desktop shadow overlay ONLY on LG+ reduced to clear top */}
        <div className="hidden lg:block absolute bottom-0 top-auto h-[65%] w-full left-0 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-5" />

        {/* Content Wrapper: Solid box on mobile, absolute lower layer on desktop */}
        <div className="relative z-10 bg-rg-invert-bg text-white px-(--rg-pad-x) py-12 lg:bg-transparent lg:pb-[clamp(40px,6vw,80px)] lg:pt-0">
          <Reveal variant="line" delay={300}>
            <DisplayHeading as="h1" size="xl" className="leading-[0.86] tracking-[-0.045em] m-0">
              Building maintenance<br />
              &amp; facility support <em className="italic font-light text-white lg:text-inherit">services</em>.
              <span className="block text-xl font-normal text-white/70 tracking-tight mt-4">The difference is in the detail.</span>
            </DisplayHeading>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-[clamp(24px,4vw,60px)] items-end">
            <Reveal delay={500}>
              <p className="text-sm md:text-base text-white/85 max-w-[52ch] leading-relaxed">
                One accountable partner. Three coordinated service pillars. One standard of excellence — applied across engineering, workplace operations, and hospitality throughout your entire facility.
              </p>
            </Reveal>
            <Reveal delay={600} className="flex flex-col sm:flex-row flex-wrap lg:justify-end gap-3 md:gap-4">
              <Link href="/services/ifm" className="rg-btn rg-btn-filled w-full sm:w-auto justify-center">
                <span>Explore IFM</span><span>→</span>
              </Link>
              <Link href="/discovery" className="rg-btn rg-btn-outline text-white border-white w-full sm:w-auto justify-center">
                <span>Schedule Assessment</span><span>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hero Marquee — MOVED OUTSIDE SECTION TO BYPASS DARK OVERLAY */}
      <Reveal delay={800}>
        <div className="relative z-20 w-full overflow-hidden border-t border-rg-invert-line border-b bg-rg-invert-bg text-white py-2.5">
          <div className="flex animate-marquee whitespace-nowrap gap-16 items-center w-max">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="font-display font-normal text-[clamp(18px,3vw,32px)] tracking-tight italic-font">Engineered reliability</span>
                <span className="text-rg-accent-light font-display text-[clamp(12px,2vw,20px)]">●</span>
                <span className="font-display font-normal text-[clamp(18px,3vw,32px)] tracking-tight italic italic-font"><em>Workplace experience</em></span>
                <span className="text-rg-accent-light font-display text-[clamp(12px,2vw,20px)]">●</span>
                <span className="font-display font-normal text-[clamp(18px,3vw,32px)] tracking-tight italic-font">Hospitality at scale</span>
                <span className="text-rg-accent-light font-display text-[clamp(12px,2vw,20px)]">●</span>
                <span className="font-display font-normal text-[clamp(18px,3vw,32px)] tracking-tight italic italic-font"><em>BUILD MY HOME FOR ME®</em></span>
                <span className="text-rg-accent-light font-display text-[clamp(12px,2vw,20px)]">●</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
