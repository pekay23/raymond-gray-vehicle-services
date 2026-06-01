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
        <div>
          <div className="flex items-center gap-3 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/RaymondgraylogoNoTextNoBG.png"
              alt="Raymond Gray"
              className="w-10 h-10 object-contain brightness-0 invert opacity-90"
            />
            <span className="font-display font-bold text-xl text-white tracking-tight whitespace-nowrap">
              Raymond Gray <span className="font-normal text-white/60">| Vehicle Services</span>
            </span>
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

      <div className="rg-foot-bottom flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 md:gap-0 w-full">
        <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:gap-4 flex-1">
          <span>Raymond Gray Limited</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span>Accra, Ghana</span>
        </div>

        <div className="flex justify-center items-center flex-1">
          <span>© {new Date().getFullYear()} · All rights reserved</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-end gap-3 md:gap-4 flex-1">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="hidden md:inline text-white/20">|</span>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
