import Image from "next/image";
import { Reveal } from "@/components/public";

export function QuoteSlabSection() {
  return (
    <section
      className="relative flex flex-col lg:block overflow-hidden bg-rg-invert-bg text-white"
      data-screen-label="The Difference"
    >
      {/* Background Image: Relative on mobile, Absolute on desktop */}
      <div className="relative h-[40vh] w-full lg:absolute lg:inset-0 lg:z-0">
        <Image
          src="/images/redesign/webp/quote-bg.webp"
          alt="EV charging connector locking into a port"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.7]"
        />
      </div>

      {/* Desktop overlay gradients only */}
      <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-black/40 via-black/25 to-transparent z-5" />
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-black/40 to-transparent z-1 pointer-events-none" />
      
      {/* Content container: Padded block on mobile, absolute on desktop */}
      <div className="relative z-10 bg-rg-invert-bg py-16 lg:py-(--rg-section-y) px-(--rg-pad-x) lg:absolute lg:inset-0 lg:flex lg:items-center lg:bg-transparent">
        <Reveal>
          <blockquote className="font-display font-normal text-[clamp(32px,5.6vw,88px)] leading-[1.06] tracking-tight m-0 max-w-[18ch] text-white drop-shadow-none lg:drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            UK-standard <em>discipline</em> in Ghana. International best practice with deep local expertise.
          </blockquote>
          <span className="font-mono text-[10px] tracking-widest uppercase text-rg-invert-ink-soft mt-12 block">— Our operating principle</span>
        </Reveal>
      </div>

      {/* Bottom desktop fade ONLY */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-rg-invert-bg to-transparent z-1 pointer-events-none" />
    </section>
  );
}
