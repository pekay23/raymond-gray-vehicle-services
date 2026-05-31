import type { Metadata } from "next";
import { PageHero } from "@/components/public/sections/PageHero";
import { SplitFeature } from "@/components/public/sections/SplitFeature";
import { PillarRows, type Pillar } from "@/components/public/sections/PillarRows";
import { CalloutSlab } from "@/components/public/sections/CalloutSlab";
import { FinalCtaSection } from "@/components/public/FinalCtaSection";
import { QuoteSlabSection } from "@/components/public/QuoteSlabSection";
import { SectionNav } from "@/components/public/SectionNav";
import { CarouselSection } from "@/components/public/sections/CarouselSection";
import { CapabilityIndex } from "@/components/public/sections/CapabilityIndex";
import { StatStrip } from "@/components/public/sections/StatStrip";
import { ImageBand } from "@/components/public/sections/ImageBand";
import { ProcessTimeline, type TimelineStep } from "@/components/public/sections/ProcessTimeline";
import { FaqTeaser } from "@/components/public/sections/FaqTeaser";

export const metadata: Metadata = {
  title: "EV & Automotive Services | Raymond Gray",
  description:
    "Every vehicle, one team, professional standards. Independent EV sales advice, scheduled EV and ICE maintenance, fleet management, and charging infrastructure — built on Raymond Gray's engineering discipline.",
};

const FLEET_LINES: Pillar[] = [
  {
    label: "ICE & Traditional",
    title: <>Heavy and light-duty <em>servicing</em>.</>,
    points: [
      "Scheduled servicing — oil, filters, belts, plugs",
      "Computerised and mechanical diagnostics",
      "Brake, suspension, steering & drivetrain",
      "Exhaust and emissions system servicing",
      "Electrical and battery diagnostics",
      "Pre-purchase / pre-lease inspection with report",
      "Heavy duty — commercial vehicles, vans, trucks",
    ],
  },
  {
    label: "Fleet Management",
    title: <>Visibility, control & <em>optimised</em> operations.</>,
    points: [
      "GPS-enabled fleet tracking and journey logging",
      "Dispatch and logistics optimisation",
      "Maintenance scheduling and PPM calendar",
      "Charging infrastructure management for EV fleet",
      "Fuel and energy cost reporting — ICE & EV",
      "Driver behaviour monitoring where applicable",
      "Monthly fleet management report",
    ],
  },
  {
    label: "Charging Infrastructure",
    title: <>Charging, <em>specified</em> and managed.</>,
    points: [
      "Site assessment — power, layout, vehicle count",
      "Charger specification — AC standard or DC rapid",
      "Smart charging — load management & off-peak",
      "Installation via accredited charger partners",
      "Ongoing maintenance and fault management",
    ],
  },
];

const STATS = [
  { value: "ICE + EV", label: "One accountable team for every vehicle" },
  { value: "PPM", label: "Manufacturer-aligned preventive maintenance" },
  { value: "IFM", label: "Integrated with your building services" },
];

const PROCESS: TimelineStep[] = [
  { phase: "01 · Assess", title: "Understand the fleet", desc: "We confirm your vehicles, usage, and goals — ICE, EV, or mixed — and how you actually drive." },
  { phase: "02 · Source / Service", title: "Right vehicle, right work", desc: "Independent sourcing for new vehicles; manufacturer-aligned PPM and repair for the ones you run." },
  { phase: "03 · Document", title: "Record everything", desc: "Every service, battery-health check, and repair is logged against each vehicle." },
  { phase: "04 · Report", title: "Monthly visibility", desc: "A monthly fleet-health summary — costs, utilisation, and maintenance status at a glance." },
];

const CAROUSEL_ITEMS = [
  {
    id: "1",
    image: "/images/redesign/carousel_charging.png",
    title: "Infrastructure Setup",
    description: "From site assessment to installation of rapid DC chargers, we manage the entire lifecycle of your charging infrastructure."
  },
  {
    id: "2",
    image: "/images/redesign/carousel_workshop.png",
    title: "Preventive Maintenance",
    description: "Our state-of-the-art facilities ensure your mixed fleet is maintained to the highest manufacturer standards."
  },
  {
    id: "3",
    image: "/images/redesign/carousel_van.png",
    title: "Fleet Logistics",
    description: "Optimize your operations with GPS-enabled tracking, routing, and comprehensive journey logging."
  }
];

export default function VehicleRepairsPage() {
  return (
    <main className="rg-public relative">
      <SectionNav />
      <PageHero
        screenLabel="Overview"
        image={{ src: "/images/redesign/hero.png", alt: "Raymond Gray EV and automotive services" }}
        eyebrow="EV & Automotive Services"
        title={<>Every vehicle. One team. <em>Professional</em> standards.</>}
        lede="This isn't a commercial garage. It's an automotive programme built on the same engineering discipline and preventive-maintenance infrastructure that manages our clients' building systems — for mixed ICE and EV fleets, and for private owners who want expert advice, not a sales pitch."
        ctas={[
          { label: "Request a Fleet Assessment", href: "/book", variant: "filled" },
          { label: "Book a Service", href: "/book", variant: "outline" },
        ]}
      />

      <CapabilityIndex />

      <div id="ev-sales" aria-hidden />
      <SplitFeature
        screenLabel="EV Sales"
        eyebrow="EV Sales — Independent Advice"
        title={<>The right vehicle — <em>not</em> the one we&apos;re paid to sell.</>}
        body="We're not tied to any manufacturer or dealer. We assess your real usage, compare honestly, and project the true cost of ownership — then coordinate procurement, delivery, and charging setup."
        image={{ src: "/images/redesign/abstract.png", alt: "Independent EV sales advice" }}
        points={[
          "Fleet or personal needs assessment",
          "Curated, honest side-by-side comparison",
          "Real-world range — not manufacturer claims",
          "Total cost of ownership projection",
          "Procurement via authorised dealers & OEMs",
          "Delivery, orientation and charging setup",
        ]}
      />

      <div id="ev-maintenance" aria-hidden />
      <SplitFeature
        reverse
        screenLabel="EV Maintenance"
        variant="muted"
        eyebrow="EV Maintenance — Scheduled & Documented"
        title={<>A named team, a <em>documented</em> service history.</>}
        body="Structured, manufacturer-aligned preventive maintenance with battery health recorded at every visit — plus responsive fault diagnosis and a monthly fleet health summary for corporate clients."
        image={{ src: "/images/redesign/bento.png", alt: "EV maintenance and charging bay" }}
        points={[
          "Manufacturer-aligned service intervals",
          "Battery health check and capacity diagnostic",
          "Tyres, brakes and regenerative system",
          "Charging port and connector integrity",
          "Fluids, software and firmware updates",
          "Annual comprehensive system diagnostic",
        ]}
      />

      <QuoteSlabSection />

      <StatStrip variant="dark" bgImage="/images/redesign/stat-texture.png" stats={STATS} />

      <CarouselSection
        screenLabel="In Action"
        eyebrow="In Action"
        title={<>See the <em>standards</em> we set.</>}
        items={CAROUSEL_ITEMS}
      />

      <div id="fleet" aria-hidden />
      <PillarRows
        screenLabel="Fleet & Charging"
        eyebrow="The Full Programme"
        title={<>One team for <em>every</em> vehicle in your fleet.</>}
        pillars={FLEET_LINES}
      />

      <ImageBand
        src="/images/redesign/process-aerial.png"
        alt="Raymond Gray vehicle depot at dusk — mixed EV and commercial fleet"
        caption="Fleet operations, coordinated"
      />

      <ProcessTimeline
        screenLabel="How we work"
        eyebrow="How we work"
        title={<>From first call to <em>monthly</em> report.</>}
        steps={PROCESS}
      />

      <CalloutSlab
        screenLabel="Integrated"
        eyebrow="Integrated with IFM"
        title={<>One call — a building fault <em>or</em> a fleet issue.</>}
        body="For organisations using our IFM services, EV & Automotive folds into the same account management, reporting pack, and helpdesk — with fleet KPIs included in your monthly building report."
        ctas={[{ label: "Request a Fleet Assessment", href: "/book", variant: "accent" }]}
        checklist={{
          label: "Built For",
          tag: "Corporate & Private",
          items: [
            "Companies running mixed ICE / EV fleets",
            "Organisations transitioning to electric",
            "IFM clients integrating fleet into one model",
            "Private owners wanting independent advice",
          ],
        }}
      />

      <FaqTeaser />

      <FinalCtaSection
        title={<>Put your whole fleet under one <em>standard</em>.</>}
        primaryBtn={{ label: "Request a Fleet Assessment", href: "/book" }}
        secondaryBtn={{ label: "Book a Service", href: "/book" }}
      />
    </main>
  );
}
