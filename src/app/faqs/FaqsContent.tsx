"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionShell, DisplayHeading, Reveal } from "@/components/public";

const faqData = [
  {
    category: "General",
    questions: [
      [
        "What is Raymond Gray EV & Automotive Services?",
        "We bring electric-vehicle sales, EV maintenance, traditional ICE vehicle servicing, and complete fleet management under one roof — built on the same engineering discipline and preventive-maintenance infrastructure that manages our clients' building systems.",
      ],
      [
        "Is this a garage?",
        "No. It's an automotive services programme. Whether you're a corporate client running a mixed fleet or a private owner, you get the same professional standards, documented service records, and one accountable team.",
      ],
      [
        "Where do you operate?",
        "We operate in Ghana, bringing UK-standard discipline together with deep local expertise.",
      ],
    ],
  },
  {
    category: "EV Sales",
    questions: [
      [
        "Are you tied to a manufacturer or dealer?",
        "No. We work for you — researching, comparing, and sourcing the electric vehicle that best fits your usage, environment, and budget, from executive sedans to utility vehicles and corporate pool cars.",
      ],
      [
        "What does the sales process include?",
        "A needs assessment, a curated and honest side-by-side shortlist, real-world range analysis (not manufacturer claims), a total-cost-of-ownership projection, procurement through authorised dealers, negotiation support, delivery coordination, and charging-setup coordination.",
      ],
    ],
  },
  {
    category: "Maintenance & Servicing",
    questions: [
      [
        "How is EV maintenance handled?",
        "Under a structured Planned Preventive Maintenance programme with a named team who know your vehicle. Every service is documented and every battery-health check recorded — covering manufacturer-aligned intervals, diagnostics, tyres and brakes, charging-port integrity, and software updates.",
      ],
      [
        "Do you service traditional (ICE) vehicles too?",
        "Yes. We service and maintain all traditional ICE vehicles — heavy and light duty — to the same documented standards as our EV programme, including scheduled servicing, diagnostics, brakes, suspension, steering, drivetrain, and emissions work.",
      ],
      [
        "Do I get a record of work done?",
        "Yes. A vehicle history record is maintained per vehicle, with a monthly fleet-health summary available for corporate clients.",
      ],
    ],
  },
  {
    category: "Fleet & Charging",
    questions: [
      [
        "What does fleet management cover?",
        "GPS-enabled tracking and journey logging, dispatch and logistics optimisation, maintenance scheduling across all vehicles, charging-infrastructure management, fuel and energy cost reporting for ICE and EV, and a monthly fleet management report.",
      ],
      [
        "Can you set up charging infrastructure?",
        "Yes. We assess your sites (power availability, layout, vehicle count), specify the right chargers (AC standard or DC rapid), design smart charging with load management, and coordinate installation through accredited partners — plus ongoing maintenance.",
      ],
      [
        "Can fleet sit inside our IFM contract?",
        "Yes. For organisations already using Raymond Gray's IFM services, EV & Automotive integrates into the same account management, reporting pack, and helpdesk — fleet KPIs sit alongside building KPIs in one monthly report.",
      ],
    ],
  },
  {
    category: "Booking & Support",
    questions: [
      [
        "How do I get started?",
        "Request a fleet assessment or book a service through our booking page. We'll confirm your vehicles and requirements, then return a tailored plan.",
      ],
      [
        "How do I reach you?",
        "Email automechanic@raymond-gray.org for fleet assessments and vehicle enquiries.",
      ],
    ],
  },
];

export function FaqsContent() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const contentRef = useRef<HTMLDivElement>(null);
  const active = faqData.find((c) => c.category === activeCategory) ?? faqData[0];

  return (
    <main className="rg-public relative">
      <section className="rg-page-hero min-h-[75vh]! flex! flex-col justify-end!" data-screen-label="FAQs">
        <div className="rg-hero-media" aria-hidden="true">
          <Reveal variant="img" className="h-full w-full">
            <Image
              src="/images/redesign/webp/faq-hero.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover saturate-[0.85]"
            />
          </Reveal>
        </div>
        <Reveal variant="line" delay={300}>
          <DisplayHeading as="h1" size="xl">
            Frequently asked <em>questions</em>.
          </DisplayHeading>
        </Reveal>
        <div className="rg-page-hero-bottom">
          <Reveal delay={500}>
            <p className="rg-lede">
              Everything you need to know about EV sales, maintenance, fleet management, charging, and booking.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionShell className="py-(--rg-section-y)!" data-screen-label="Questions">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <DisplayHeading as="h2" size="lg" className="m-0">
                Choose a topic &amp; expand the <em>detail</em>.
              </DisplayHeading>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mb-16 flex flex-wrap gap-2 items-center justify-start border border-rg-line-soft rounded-full p-1 bg-rg-bg-2 w-max max-w-full overflow-x-auto no-scrollbar">
              {faqData.map((c) => {
                const isActive = c.category === activeCategory;
                return (
                  <button
                    key={c.category}
                    type="button"
                    onClick={() => setActiveCategory(c.category)}
                    className={`relative px-3 py-1.5 sm:px-6 sm:py-3 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white text-rg-ink shadow-sm border border-rg-line"
                        : "text-rg-ink-soft hover:text-rg-ink hover:bg-black/5"
                    }`}
                  >
                    {c.category}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div ref={contentRef} className="relative">
            <Reveal key={activeCategory} variant="fade">
              <div className="flex flex-col border-t-2 border-rg-ink/10">
                {active.questions.map(([question, answer]) => (
                  <FAQItem key={question} question={question} answer={answer} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-b border-rg-line last:border-0">
      <button
        type="button"
        className="w-full py-8 flex justify-between items-center text-left group gap-6"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <DisplayHeading as="h3" size="sm" className="m-0 group-hover:text-rg-accent transition-colors">
          {question}
        </DisplayHeading>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-rg-ink-mute text-2xl font-light shrink-0"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12">
              <p className="text-rg-ink-soft text-lg leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
