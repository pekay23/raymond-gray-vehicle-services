import Image from "next/image";
import { DisplayHeading, Reveal } from "@/components/public";

const commitments = [
  ["I", "UK-Standard Discipline in Ghana.", "Our roots are in the UK building industry's rigorous standards — precision, accountability, and long-term thinking. We apply that discipline consistently across Ghana: international best practice with deep local expertise."],
  ["II", "One partner. One contract. One SLA.", "We don't just supply services — we operate your property as one integrated system. The same quality framework that governs our engineers governs our canteen teams, our housekeeping staff, and our finishing specialists."],
  ["III", "A 60-day workmanship guarantee.", "Every repair and maintenance job carries our 60-day workmanship guarantee. We stand behind the quality of our work, always."],
  ["IV", "Proactive, not reactive.", "We build Asset Health Indexes, operate preventive maintenance programmes, and plan capital expenditure years ahead — so your building gets better over time, not just managed."],
];

export function CommitmentsSection() {
  return (
    <section className="relative flex flex-col w-full overflow-hidden" data-screen-label="Commitments">
      <div className="relative flex flex-col lg:block min-h-0 lg:min-h-[460px] mt-0 bg-rg-bg">
        {/* Image Container: Relative on mobile, absolute on LG */}
        <div className="relative h-[35vh] w-full lg:absolute lg:inset-0 lg:h-full lg:z-0">
          <Image
            src="/images/sections/home/commitments.webp"
            alt="Modern commercial building exterior at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        
        {/* Gradient Overlay: Hidden on mobile, ONLY on Desktop */}
        {/* Overlay removed as requested */}
        {/* Header Text Wrapper: Solid padded cell on mobile, Overlay wrapper on desktop */}
        <div className="relative z-10 py-16 px-(--rg-pad-x) bg-rg-bg lg:bg-transparent lg:flex lg:items-center lg:h-full lg:min-h-[460px] lg:absolute lg:inset-0">
          <Reveal>
            <DisplayHeading size="lg" className="max-w-xl m-0 text-rg-ink">The Raymond Gray <em>difference</em>.</DisplayHeading>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-rg-line">
        {commitments.map(([num, title, text], i) => (
          <Reveal key={num} delay={i * 100} variant="fade" className="h-full">
            <div className="p-10 border-r border-b border-rg-line last:lg:border-r-0 md:nth-child(2n):border-r-0 lg:nth-child(2n):border-r min-h-[320px] h-full flex flex-col justify-between bg-rg-surface hover:bg-rg-accent-subtle transition-colors duration-300">
              <span className="w-14 h-14 border border-rg-line rounded-full flex items-center justify-center text-rg-accent font-display italic text-2xl italic-font shrink-0">
                {num}
              </span>
              <div className="mt-8">
                <DisplayHeading as="h3" size="sm" className="mb-4 m-0">{title}</DisplayHeading>
                <p className="text-sm text-rg-ink-soft leading-relaxed m-0">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
