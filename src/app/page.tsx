import type { Metadata } from "next";
import { PageHero } from "@/components/public/sections/PageHero";
import { SplitFeature } from "@/components/public/sections/SplitFeature";
import { PillarRows, type Pillar } from "@/components/public/sections/PillarRows";
import { CalloutSlab } from "@/components/public/sections/CalloutSlab";
import { FinalCtaSection } from "@/components/public/FinalCtaSection";

export const metadata: Metadata = {
  title: "EV & Automotive Services | Raymond Gray",
  description:
    "Every vehicle, one team, professional standards. Independent EV sales advice, scheduled EV and ICE maintenance, fleet management, and charging infrastructure ΓÇö built on Raymond Gray's engineering discipline.",
};

const FLEET_LINES: Pillar[] = [
  {
    label: "ICE & Traditional",
    title: <>Heavy and light-duty <em>servicing</em>.</>,
    points: [
      "Scheduled servicing ΓÇö oil, filters, belts, plugs",
      "Computerised and mechanical diagnostics",
      "Brake, suspension, steering & drivetrain",
      "Exhaust and emissions system servicing",
      "Electrical and battery diagnostics",
      "Pre-purchase / pre-lease inspection with report",
      "Heavy duty ΓÇö commercial vehicles, vans, trucks",
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
      "Fuel and energy cost reporting ΓÇö ICE & EV",
      "Driver behaviour monitoring where applicable",
      "Monthly fleet management report",
    ],
  },
  {
    label: "Charging Infrastructure",
    title: <>Charging, <em>specified</em> and managed.</>,
    points: [
      "Site assessment ΓÇö power, layout, vehicle count",
      "Charger specification ΓÇö AC standard or DC rapid",
      "Smart charging ΓÇö load management & off-peak",
      "Installation via accredited charger partners",
      "Ongoing maintenance and fault management",
    ],
  },
];

export default function VehicleRepairsPage() {
  return (
    <main className="rg-public relative">
      <PageHero
        screenLabel="Overview"
        image={{ src: "/images/heros/hero-ev.webp", alt: "Raymond Gray EV and automotive services" }}
        eyebrow="EV & Automotive Services"
        title={<>Every vehicle. One team. <em>Professional</em> standards.</>}
        lede="This isn't a commercial garage. It's an automotive programme built on the same engineering discipline and preventive-maintenance infrastructure that manages our clients' building systems ΓÇö for mixed ICE and EV fleets, and for private owners who want expert advice, not a sales pitch."
        ctas={[
          { label: "Request a Fleet Assessment", href: "/discovery?service=ev", variant: "filled" },
          { label: "Book a Service", href: "/services/vehicle-repairs/book", variant: "outline" },
        ]}
      />

      <SplitFeature
        screenLabel="EV Sales"
        eyebrow="EV Sales ΓÇö Independent Advice"
        title={<>The right vehicle ΓÇö <em>not</em> the one we&apos;re paid to sell.</>}
        body="We're not tied to any manufacturer or dealer. We assess your real usage, compare honestly, and project the true cost of ownership ΓÇö then coordinate procurement, delivery, and charging setup."
        image={{ src: "/images/services/ev-portrait.webp", alt: "Independent EV sales advice" }}
        points={[
          "Fleet or personal needs assessment",
          "Curated, honest side-by-side comparison",
          "Real-world range ΓÇö not manufacturer claims",
          "Total cost of ownership projection",
          "Procurement via authorised dealers & OEMs",
          "Delivery, orientation and charging setup",
        ]}
      />

      <SplitFeature
        reverse
        screenLabel="EV Maintenance"
        variant="muted"
        eyebrow="EV Maintenance ΓÇö Scheduled & Documented"
        title={<>A named team, a <em>documented</em> service history.</>}
        body="Structured, manufacturer-aligned preventive maintenance with battery health recorded at every visit ΓÇö plus responsive fault diagnosis and a monthly fleet health summary for corporate clients."
        image={{ src: "/images/services/ev-charging-bay.webp", alt: "EV maintenance and charging bay" }}
        points={[
          "Manufacturer-aligned service intervals",
          "Battery health check and capacity diagnostic",
          "Tyres, brakes and regenerative system",
          "Charging port and connector integrity",
          "Fluids, software and firmware updates",
          "Annual comprehensive system diagnostic",
        ]}
      />

      <PillarRows
        screenLabel="Fleet & Charging"
        eyebrow="The Full Programme"
        title={<>One team for <em>every</em> vehicle in your fleet.</>}
        pillars={FLEET_LINES}
      />

      <CalloutSlab
        screenLabel="Integrated"
        eyebrow="Integrated with IFM"
        title={<>One call ΓÇö a building fault <em>or</em> a fleet issue.</>}
        body="For organisations using our IFM services, EV & Automotive folds into the same account management, reporting pack, and helpdesk ΓÇö with fleet KPIs included in your monthly building report."
        ctas={[{ label: "Request a Fleet Assessment", href: "/discovery?service=ev", variant: "accent" }]}
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

      <FinalCtaSection
        title={<>Put your whole fleet under one <em>standard</em>.</>}
        primaryBtn={{ label: "Request a Fleet Assessment", href: "/discovery?service=ev" }}
        secondaryBtn={{ label: "Book a Service", href: "/services/vehicle-repairs/book" }}
      />
    </main>
  );
}
