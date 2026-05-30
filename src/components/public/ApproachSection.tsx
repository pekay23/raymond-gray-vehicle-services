import Image from "next/image";
import Link from "next/link";
import { SectionShell, DisplayHeading, Reveal } from "@/components/public";

const pillars = [
  {
    eyebrow: "i.",
    title: "Technical Services",
    text: "Engineering-led maintenance, compliance & lifecycle planning.",
    img: "/images/sections/technical/electricaltechniciancheckingdbbox.webp",
    href: "/services/engineering",
    items: ["HVAC, electrical, plumbing, fire safety", "BMS, IT & data infrastructure", "Energy management & optimisation", "Capital projects & lifecycle planning"],
  },
  {
    eyebrow: "ii.",
    title: "Workplace Support",
    text: "Space planning, concierge, travel management & security.",
    img: "/images/heros/frontdeskwoman.webp",
    href: "/services/workplace",
    items: ["Space planning & utilisation", "Moves, relocations, fit-out", "Concierge & front-of-house", "Travel management solutions"],
  },
  {
    eyebrow: "iii.",
    title: "Hospitality & Housekeeping",
    text: "Cleaning, catering, waste, boardroom management & events.",
    img: "/images/services/canteen.webp",
    href: "/services/hospitality",
    items: ["Cleaning & janitorial programmes", "Canteen & catering operations", "Boardroom & meeting management", "Events & client hosting"],
  },
];

export function ApproachSection() {
  return (
    <SectionShell className="pt-0! pb-0!" data-screen-label="Approach">
      <div className="relative flex flex-col lg:block overflow-hidden mb-20 -mx-(--rg-pad-x) bg-white">
        {/* Background image: Relative on mobile, Absolute on desktop */}
        <div className="relative h-[45vh] w-full lg:absolute lg:inset-0 lg:z-0">
          <Image
            src="/images/sections/home/approach-hero.webp"
            alt="Operations manager briefing technical team in a modern lobby"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right lg:object-[80%_center]"
          />
        </div>
        
        {/* Gradient overlay — HIDDEN ON MOBILE, ONLY ON DESKTOP */}
        <div className="hidden lg:block absolute inset-0 bg-linear-to-r lg:from-rg-surface lg:via-rg-surface/80 lg:via-35% lg:to-transparent lg:to-60%" />
        
        {/* Text content: Clean padded box on mobile, Absolute overlay on desktop */}
        <div className="relative z-10 py-16 px-(--rg-pad-x) lg:py-0 lg:flex lg:items-center lg:h-full lg:min-h-[540px] lg:absolute lg:inset-0">
          <Reveal delay={200}>
            <div className="max-w-xl">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-rg-ink-soft mb-8 block">
                — Our Approach
              </span>
              <DisplayHeading size="lg">One provider for your <em>entire facility</em>.</DisplayHeading>
              <p className="rg-lede mt-8 text-rg-ink lg:text-rg-ink-soft">
                Facility management shouldn&rsquo;t require your leadership team to
                coordinate multiple vendors. Raymond Gray&rsquo;s IFM model consolidates every building
                service under one accountable partner &mdash; so your team focuses on the core business, not on vendor management.
              </p>
              <Link href="/services/ifm" className="rg-btn rg-btn-filled mt-10 inline-flex">
                <span>Explore IFM</span><span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 150} variant="fade" className="h-full">
            <article className="border border-rg-line p-8 flex flex-col gap-6 min-h-[420px] bg-rg-surface group hover:bg-rg-accent-subtle hover:border-rg-line-strong transition-colors duration-300 h-full">
              <Reveal variant="img" delay={i * 150} className="aspect-4/3 bg-rg-ink/5 relative overflow-hidden block">
                <Image 
                  src={pillar.img} 
                  alt={pillar.title} 
                  fill 
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </Reveal>
              <DisplayHeading as="h3" size="sm" className="m-0 leading-tight group-hover:text-rg-accent transition-colors">{pillar.text}</DisplayHeading>
              <ul className="flex flex-col gap-2 list-none p-0 m-0 text-sm text-rg-ink-soft">
                {pillar.items.map((item) => (
                  <li key={item} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-3 before:h-px before:bg-rg-line">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 border-t border-rg-line-soft">
                <Link href={pillar.href} className="rg-link-arrow">
                  <span>{pillar.eyebrow} — {pillar.title.split(" ")[0]}</span><span className="arrow">→</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="relative flex flex-col lg:block overflow-hidden mt-20 -mx-(--rg-pad-x) bg-rg-bg-2 border-t border-b border-rg-line lg:border-0">
        {/* Bottom image: Relative on mobile, absolute on LG */}
        <div className="relative h-[40vh] w-full lg:absolute lg:inset-0 lg:z-0">
          <Image
            src="/images/sections/home/sla-agreement-v2.webp"
            alt="Professional businessmen sealing a corporate deal with a handshake"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>

        {/* Desktop light fade ONLY */}
        <div className="hidden lg:block absolute inset-0 bg-linear-to-r lg:from-rg-surface lg:via-rg-surface/60 lg:via-30% lg:to-transparent lg:to-55%" />
        {/* Bottom dark bridge ONLY on desktop */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/40 to-transparent z-1 pointer-events-none" />
        
        {/* Content Block: Clean box on mobile, Absolute overlay on desktop */}
        <div className="relative z-10 py-12 px-(--rg-pad-x) lg:py-0 lg:flex lg:items-center lg:h-full lg:min-h-[380px] lg:absolute lg:inset-0">
          <Reveal delay={200}>
            <DisplayHeading as="h3" size="md" className="m-0 max-w-2xl text-rg-ink">
              One SLA, one helpdesk, one account manager, one monthly report — <em>across everything</em>.
            </DisplayHeading>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
