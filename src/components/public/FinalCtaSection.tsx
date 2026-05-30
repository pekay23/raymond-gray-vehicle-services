import Image from "next/image";
import Link from "next/link";
import { DisplayHeading, Reveal } from "@/components/public";

interface FinalCtaProps {
  title?: string | React.ReactNode;
  label?: string;
  lede?: React.ReactNode;
  image?: { src: string; alt: string };
  primaryBtn?: {
    label: string;
    href: string;
  };
  secondaryBtn?: {
    label: string;
    href: string;
  };
}

export function FinalCtaSection({
  title = <>Tell us about your <em>building</em> or project.</>,
  label = "— Start with an Assessment",
  lede = (
    <>
      We&rsquo;ll schedule a short assessment and return a tailored proposal —
      scope, staffing matrix, SLAs, mobilisation, and commercials. Every
      proposal is built around what you actually need.
    </>
  ),
  image = { src: "/images/sections/home/connect.webp", alt: "Premium architectural detail" },
  primaryBtn = { label: "Pre-Mobilisation Form", href: "/discovery" },
  secondaryBtn = { label: "About Raymond Gray", href: "/about" }
}: FinalCtaProps) {
  return (
    <section
      className="relative flex flex-col lg:block overflow-hidden bg-rg-invert-bg text-white text-center"
      data-screen-label="Connect"
    >
      {/* Background Visual: Relative on mobile, absolute on LG */}
      <Reveal variant="img" delay={0} className="relative h-[35vh] w-full lg:absolute lg:inset-0 lg:z-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover brightness-[0.65] lg:brightness-[0.35]"
        />
      </Reveal>

      {/* Desktop Static Overlays ONLY */}
      <div className="hidden lg:block absolute inset-0 bg-black/50 z-5" />

      {/* Final Form Wrapper: Solid dark box on mobile, centered overlay on desktop */}
      <div className="relative z-10 flex flex-col items-center bg-rg-invert-bg py-20 px-(--rg-pad-x) lg:py-32 lg:absolute lg:inset-0 lg:justify-center lg:bg-transparent">
        <Reveal delay={0} className="mb-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-rg-invert-ink-soft block text-center">{label}</span>
        </Reveal>
        
        <Reveal delay={120} className="mb-10">
          <DisplayHeading size="xl" className="max-w-[20ch] mx-auto m-0 text-white drop-shadow-none lg:drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {title}
          </DisplayHeading>
        </Reveal>
        
        <Reveal delay={240} className="mb-24">
          <p className="rg-lede max-w-[60ch] mx-auto m-0 text-white/95! drop-shadow-none lg:drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] text-center">
            {lede}
          </p>
        </Reveal>
        
        <Reveal delay={360}>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={primaryBtn.href} className="rg-btn bg-white! border-white! text-black! hover:bg-(--rg-accent)! hover:border-(--rg-accent)! hover:text-white! font-medium">
              <span>{primaryBtn.label}</span><span className="arrow">→</span>
            </Link>
            <Link href={secondaryBtn.href} className="rg-btn border-white/50! text-white! hover:bg-white! hover:text-black! font-medium">
              <span>{secondaryBtn.label}</span><span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
