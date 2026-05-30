"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Home", num: "01" },
  { href: "/services", label: "Services", num: "02" },
  { href: "/industries", label: "Industries", num: "03" },
  { href: "/about", label: "About", num: "04" },
  { href: "/updates", label: "Updates", num: "05" },
  { href: "/contact", label: "Contact", num: "06" },
];

const SERVICE_LINKS = [
  { href: "/services/ifm", label: "Integrated Facility Management" },
  { href: "/services/engineering", label: "Technical Services" },
  { href: "/services/workplace", label: "Workplace Support" },
  { href: "/services/hospitality", label: "Hospitality & Housekeeping" },
  { href: "/services/residential", label: "Residential Facility Management" },
  { href: "/services/specialist", label: "Specialist & Bespoke" },
];

export const OverlayMenu: React.FC<OverlayMenuProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className={cn(
        "rg-overlay rg-public",
        isOpen && "is-open"
      )}
      aria-hidden={!isOpen}
    >
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
            href="/signin"
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
            Portal
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
            <p className="rg-label">Services</p>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {SERVICE_LINKS.map((s) => (
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
              <a href="tel:+233551010108" className="hover:text-rg-accent-light transition-colors">+233 551 010 108</a>
              <p>We acknowledge every enquiry within one working day.</p>
            </div>
            <div>
              <p className="rg-label">Operating in</p>
              <p>Ghana</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
