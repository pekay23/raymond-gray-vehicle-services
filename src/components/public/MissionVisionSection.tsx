import Image from "next/image";
import { SectionShell, DisplayHeading, Reveal } from "@/components/public";

export function MissionVisionSection() {
  return (
    <SectionShell className="pt-0 pb-12!" data-screen-label="Mission & Vision">
      <div className="aspect-21/7 relative overflow-hidden mb-20">
        <Image
          src="/images/sections/home/frontdeskwomansmiling.webp"
          alt="Front desk woman smiling"
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20">
        <Reveal>
          <div>
            <DisplayHeading size="lg" className="mt-0 mb-0">Redefining facility management in <em>Africa</em>.</DisplayHeading>
            
            <div className="mt-12 lg:mt-20">
              <div className="pl-6 border-l-2 border-rg-accent-deep mb-10">
                <p className="text-rg-ink text-xl leading-relaxed mb-4">
                  <em className="italic-font italic text-rg-accent-deep">Our mission</em> — to deliver end-to-end building services with uncompromising quality, innovation, and sustainability.
                </p>
              </div>

              <div className="pl-6 border-l-2 border-rg-line-strong">
                <p className="text-rg-ink-soft text-xl leading-relaxed">
                  <em className="italic-font italic">Our vision</em> — to redefine facility management in Africa through integrated solutions that enhance safety, efficiency, and experience.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div>
            <DisplayHeading as="h3" size="sm" className="mb-8 m-0">Core Values</DisplayHeading>
            <div className="flex flex-col border-t border-rg-line mt-0">
              {[
                { n: "01", t: "Integrity", d: "Transparent, reliable, accountable delivery." },
                { n: "02", t: "Partnership", d: "Long-term collaboration that adds measurable value." },
                { n: "03", t: "Safety First", d: "Zero accident culture, compliance-led operations." },
                { n: "04", t: "Sustainability", d: "Recycling, renewables, eco-conscious practices." },
                { n: "05", t: "Innovation", d: "Smart technologies and energy-efficient solutions." },
              ].map((v) => (
                <div key={v.n} className="py-8 border-b border-rg-line grid grid-cols-[60px_1fr] gap-4 group hover:pl-3 transition-all duration-300 cursor-default">
                  <span className="font-mono text-xs text-rg-ink-subtle group-hover:text-rg-accent transition-colors">{v.n}</span>
                  <div>
                    <DisplayHeading as="h4" size="xs" className="m-0 mb-2 group-hover:text-rg-accent-deep transition-colors">{v.t}</DisplayHeading>
                    <p className="text-sm text-rg-ink-soft">{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
