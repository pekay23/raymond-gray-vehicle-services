"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Page-to-page navigation only. In-page section jumping is handled by SectionNav.
const NAV_LINKS = [
  { href: "/", label: "Home", num: "01" },
  { href: "/book", label: "Book a Service", num: "02" },
  { href: "/faqs", label: "FAQs", num: "03" },
];

import { Dialog, DialogPortal, DialogOverlay, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

const SECONDARY_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export const OverlayMenu: React.FC<OverlayMenuProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogContent
          className={cn(
            "rg-overlay rg-public is-open",
            "fixed inset-0 z-50 outline-none"
          )}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
      {/* Header — matches handoff .overlay-head */}
      <div className="rg-overlay-head">
        <Link href="/" onClick={onClose} className="rg-wordmark flex items-center" style={{ height: '40px', overflow: 'visible' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/logos/Raymondgraylogo169WhiteNoBG.png" 
            alt="Raymond Gray" 
            className="object-contain transition-opacity duration-300 transform scale-[1.5] md:scale-[1.8]"
            style={{
              height: '100%',
              width: 'auto',
              transformOrigin: 'left center',
              padding: '6px 0',
            }}
          />
        </Link>
        <div className="rg-nav-actions">
          <Link
            href="/book"
            onClick={onClose}
            className="rg-nav-login"
            style={{
              color: 'inherit',
              fontFamily: 'var(--rg-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Book a service
          </Link>
          <button
            onClick={onClose}
            className="rg-overlay-close"
            aria-label="Close Menu"
          >
            <span>Close</span>
            <div className="rg-x" />
          </button>
        </div>
      </div>

      {/* Body — matches handoff .overlay-body (2fr 1fr grid) */}
      <div className="rg-overlay-body">
        <nav className="rg-overlay-nav">
          <ol>
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                >
                  <span className="idx">{link.num}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <aside className="rg-overlay-side hidden lg:flex">
          <div>
            <p className="rg-label">More</p>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {SECONDARY_LINKS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} onClick={onClose} className="hover:text-rg-accent-light transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <p className="rg-label">Enquiries</p>
              <a href="mailto:automechanic@raymond-gray.org" className="hover:text-rg-accent-light transition-colors break-all">automechanic@raymond-gray.org</a>
              <p>We acknowledge every enquiry within one working day.</p>
            </div>
            <div>
              <p className="rg-label">Operating in</p>
              <p>Ghana</p>
            </div>
          </div>
        </aside>
      </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
