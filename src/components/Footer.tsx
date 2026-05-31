import Link from "next/link";

const footerLinks = [
  {
    title: "Services",
    links: [
      { href: "/#ev-sales", label: "EV Sales" },
      { href: "/#ev-maintenance", label: "EV Maintenance" },
      { href: "/#fleet", label: "ICE Servicing" },
      { href: "/#fleet", label: "Fleet Management" },
      { href: "/#fleet", label: "Charging Infrastructure" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/faqs", label: "FAQs" },
      { href: "/book", label: "Book a Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:automechanic@raymond-gray.org", label: "automechanic@raymond-gray.org" },
      { href: "https://raymond-gray.org", label: "Main Raymond Gray site" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="rg-public rg-foot relative z-20">
      <div className="rg-foot-grid">
        <div className="pl-3 sm:pl-5 lg:pl-6">
          <div className="flex items-center mb-8" style={{ height: "48px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/RaymondgraylogoNoBG.png"
              alt="Raymond Gray"
              className="object-contain brightness-0 invert opacity-80"
              style={{
                height: "100%",
                width: "auto",
                transform: "scale(2.2)",
                transformOrigin: "left center",
                padding: "8px 0",
              }}
            />
          </div>
          <p className="rg-foot-big">Every vehicle. One <em>team</em>.</p>
          <p className="rg-body">
            Independent EV sales, scheduled EV &amp; ICE maintenance, fleet management, and charging
            infrastructure — built on Raymond Gray&rsquo;s engineering discipline. Accra, Ghana.
          </p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li key={link.href + link.label}>
                  {link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                    <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rg-foot-bottom flex-col md:flex-row items-center md:items-end justify-center md:justify-between text-center md:text-left gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span>Raymond Gray Limited</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span>Accra, Ghana</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <span className="hidden md:inline text-white/20">|</span>
          <span>© {new Date().getFullYear()} · All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
