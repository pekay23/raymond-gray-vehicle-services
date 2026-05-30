import Link from "next/link";

const footerLinks = [
  {
    title: "Services",
    links: [
      { href: "/services/ifm", label: "Integrated Facility Management" },
      { href: "/services/engineering", label: "Technical Services" },
      { href: "/services/workplace", label: "Workplace Support" },
      { href: "/services/hospitality", label: "Hospitality & Housekeeping" },
      { href: "/services/residential", label: "Residential Facility Management" },
      { href: "/services/specialist", label: "Specialist & Bespoke" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "All Services" },
      { href: "/industries", label: "Industries We Serve" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/updates", label: "Updates" },
      { href: "/faqs", label: "FAQs" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Portals",
    links: [
      { href: "/client/dashboard", label: "Client Portal" },
      { href: "/technician/dashboard", label: "Technician Access" },
      { href: "/admin/dashboard", label: "Admin Dashboard" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="rg-foot relative z-20">
      <div className="rg-foot-grid">
        <div>
          <div className="flex items-center mb-8" style={{ height: '48px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/logos/RaymondgraylogoNoBG.png" 
              alt="Raymond Gray" 
              className="object-contain brightness-0 invert opacity-80"
              style={{
                height: '100%',
                width: 'auto',
                transform: 'scale(2.2)', /* ADJUSTMENT: Increase or decrease this value (e.g. 1.5, 2.5) to change the visual size of the logo */
                transformOrigin: 'left center',
                padding: '8px 0',
              }}
            />
          </div>
          <p className="rg-foot-big">The difference is in the <em>detail</em>.</p>
          <p className="rg-body">
            Integrated facility management, technical engineering, hospitality, and bespoke estate support for Ghana and beyond.
          </p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
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
