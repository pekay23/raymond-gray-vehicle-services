"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OverlayMenu } from "./OverlayMenu";

const SOLID_NAV_SCROLL_Y = 12;

export const TopNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const pathname = usePathname();
  const isLegalPage = pathname === '/privacy' || pathname === '/terms';
  const isHome = pathname === "/";
  // The home hero's building signage already shows the wordmark, so hide the nav
  // wordmark while the transparent header sits over the hero; reveal it once scrolled.
  const hideWordmark = isHome && !isScrolled && !isMenuOpen;

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > SOLID_NAV_SCROLL_Y);

    // Hide when footer is in view
    const footer = document.querySelector(".rg-foot");
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      setIsHidden(footerRect.top < window.innerHeight * 0.5);
    }

    // Section tracking
    const sections = Array.from(document.querySelectorAll("[data-screen-label]"));
    let activeSection = "";
    for (let i = sections.length - 1; i >= 0; i--) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.4) {
        activeSection = sections[i].getAttribute("data-screen-label") || "";
        break;
      }
    }
    setCurrentSection(activeSection);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Move the initial call out of the synchronous render cycle
    const timeoutId = setTimeout(() => handleScroll(), 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  return (
    <>
      <Link
        href="/book"
        className="rg-mobile-top-action fixed right-[5.75rem] top-3 z-100 inline-flex min-h-11 appearance-none items-center justify-center border-0 bg-transparent px-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] lg:hidden"
        style={{
          top: 'calc(12px + env(safe-area-inset-top, 0px))',
        }}
      >
        Book a Service
      </Link>
      <button
        onClick={() => setIsMenuOpen(true)}
        className="rg-mobile-top-action fixed right-4 top-3 z-100 inline-flex min-h-11 appearance-none items-center justify-center gap-2 border-0 bg-transparent px-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] lg:hidden"
        style={{
          top: 'calc(12px + env(safe-area-inset-top, 0px))',
          visibility: isMenuOpen ? 'hidden' : 'visible',
        }}
        aria-label="Open Menu"
      >
        <span>Menu</span>
        <span className="relative block h-3 w-6" aria-hidden="true">
          <span className="absolute right-0 top-[2px] h-px w-full bg-current" />
          <span className="absolute bottom-[2px] right-0 h-px w-3/4 bg-current" />
        </span>
      </button>

      {/* iOS Safe Area Fill: Extracted OUTSIDE the header so it never hides.
          This ensures that even when the TopNav translates out of view on scroll down,
          the physical notch area remains opaque and the page content doesn't leak behind it. */}
      <div
        aria-hidden="true"
        className="rg-safe-fill rg-desktop-safe-fill hidden lg:block border-none! shadow-none!"
        data-scrolled={isScrolled}
        data-legal={isLegalPage}
        data-menu-open={isMenuOpen}
        style={{ borderBottom: 'none', boxShadow: 'none' }}
      />
      <header
        className={`rg-public rg-topnav-safe rg-desktop-topnav hidden lg:flex ${isScrolled ? 'is-scrolled' : ''} border-none! border-b-0! shadow-none! ring-0 outline-none`}
        data-scrolled={isScrolled}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'var(--rg-pad-x)',
          paddingRight: 'var(--rg-pad-x)',
          marginTop: 0,
          transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          // Solid background when scrolled, gradient when not
          background: isMenuOpen ? 'transparent' : (isScrolled ? 'var(--rg-bg)' : (isLegalPage ? 'transparent' : 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)')),
          borderBottom: 'none',
          border: 'none',
          boxShadow: 'none',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          color: isMenuOpen ? '#ffffff' : ((isScrolled || isLegalPage) ? 'var(--rg-ink)' : '#ffffff'),
          pointerEvents: 'none' as const,
          transform: isHidden ? 'translateY(-100%)' : 'none',
          opacity: isHidden ? 0 : 1,
        }}
      >
        <Link
          href="/"
          aria-hidden={hideWordmark}
          tabIndex={hideWordmark ? -1 : 0}
          style={{
            pointerEvents: hideWordmark ? 'none' : 'auto',
            opacity: hideWordmark ? 0 : 1,
            transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), color 400ms',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="flex items-center gap-3 relative z-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/logos/RaymondgraylogoNoTextNoBG.png"
              alt="Raymond Gray" 
              className={`w-8 h-8 object-contain transition-all duration-500 ${(!isScrolled && !isLegalPage) || isMenuOpen ? "brightness-0 invert opacity-90" : ""}`}
            />
            <span className={`font-display font-bold text-lg tracking-tight hidden sm:block ${(!isScrolled && !isLegalPage) || isMenuOpen ? "text-white" : "text-(--rg-ink)"}`}>
              Raymond Gray <span className={`font-normal ${(!isScrolled && !isLegalPage) || isMenuOpen ? "text-white/70" : "text-(--rg-ink-subtle)"}`}>| Vehicle Services</span>
            </span>
          </div>
        </Link>

        {/* Section Title — handoff: mono 10px, tracking 0.15em, accent color — Hidden on mobile to prevent wordmark collision */}
        <div
          className="hidden md:block"
          style={{
            position: 'absolute',
            left: '50%',
            transform: `translateX(-50%) translateY(${isScrolled && currentSection ? '0' : '10px'})`,
            fontFamily: 'var(--rg-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: 'var(--rg-accent-deep)',
            opacity: isScrolled && currentSection ? 1 : 0,
            transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none' as const,
          }}
        >
          {currentSection}
        </div>

        <div className="rg-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '32px', pointerEvents: 'auto' }}>
          {/* Portal login link - visible on desktop, hidden on mobile (handled by Tailwind) */}
          <Link
            href="/book"
            className="rg-nav-login inline-block"
            style={{
              color: 'inherit',
              fontFamily: 'var(--rg-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              transition: 'color 400ms',
            }}
          >
            Book a Service
          </Link>

          {/* Menu button — handoff: mono 11px, tracking 0.12em, gap 12px */}
          <button
            onClick={() => setIsMenuOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--rg-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              fontWeight: 500,
              transition: 'color 400ms',
              pointerEvents: 'auto',
              visibility: isMenuOpen ? 'hidden' : 'visible',
            }}
            aria-label="Open Menu"
          >
            <span className="hidden sm:inline">Menu</span>
            <div className="relative w-7 h-3">
              <span className="absolute top-[2px] right-0 w-full h-px bg-current" />
              <span className="absolute bottom-[2px] right-0 w-3/4 h-px bg-current" />
            </div>
          </button>
        </div>
      </header>

      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
