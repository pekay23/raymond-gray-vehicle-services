"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Homepage", index: "01" },
  { href: "/services/ifm", label: "IFM Hub", index: "02" },
  { href: "/services/engineering", label: "Technical", index: "03" },
  { href: "/services/workplace", label: "Workplace", index: "04" },
  { href: "/services/hospitality", label: "Hospitality", index: "05" },
  { href: "/services/construction", label: "Specialist", index: "06" },
  { href: "/about", label: "About", index: "07" },
  { href: "/contact", label: "Contact", index: "08" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="rg-topnav" aria-label="Primary navigation">
        <Link href="/" className="rg-wordmark" onClick={() => setIsOpen(false)}>
          Raymond <span>Gray</span>
        </Link>
        <div className="rg-nav-actions">
          <Link href="/signin" className="rg-nav-login">
            Portal
          </Link>
          <button
            type="button"
            className="rg-menu-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <span>Menu</span>
            <span className="rg-lines" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rg-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rg-overlay-head">
              <Link href="/" className="rg-wordmark" onClick={() => setIsOpen(false)}>
                Raymond <span>Gray</span>
              </Link>
              <div className="rg-nav-actions">
                <Link href="/signin" className="rg-nav-login" onClick={() => setIsOpen(false)}>
                  Portal
                </Link>
                <button type="button" className="rg-overlay-close" onClick={() => setIsOpen(false)}>
                  <span>Close</span>
                  <span className="rg-x" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="rg-overlay-body">
              <ol className="rg-overlay-nav">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                      >
                        <span>{link.index}</span>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ol>
              <aside className="rg-overlay-side" aria-label="Raymond Gray contact">
                <div>
                  <p className="rg-label">Operating Standard</p>
                  <p>UK-standard discipline in Ghana. One accountable partner for facility, engineering, and estate support.</p>
                </div>
                <div>
                  <p className="rg-label">Direct Contact</p>
                  <a href="mailto:contactus@raymond-gray.org">contactus@raymond-gray.org</a>
                  <a href="tel:+233551010108">+233 551 010 108</a>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
