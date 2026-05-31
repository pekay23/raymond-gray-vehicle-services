"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OverlayMenu } from "./OverlayMenu";

export const TopNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const pathname = usePathname();
  const isLegalPage = pathname === '/privacy' || pathname === '/terms';

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);

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
      <header
        className="rg-public"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: isScrolled ? 'calc(12px + env(safe-area-inset-top, 0px))' : 'calc(20px + env(safe-area-inset-top, 0px))',
          paddingBottom: isScrolled ? '12px' : '20px',
          paddingLeft: 'var(--rg-pad-x)',
          paddingRight: 'var(--rg-pad-x)',
          marginTop: 0,
          transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          background: isMenuOpen ? 'transparent' : (isScrolled ? 'var(--rg-bg)' : (isLegalPage ? 'transparent' : 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)')),
          borderBottom: (isScrolled && !isMenuOpen) ? '1px solid var(--rg-line)' : 'none',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          color: isMenuOpen ? '#ffffff' : ((isScrolled || isLegalPage) ? 'var(--rg-ink)' : '#ffffff'),
          pointerEvents: 'none' as const,
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          opacity: isHidden ? 0 : 1,
        }}
      >
        {/* iOS Safe Area Fill: With viewport-fit=cover, fixed top:0 is at the physical screen top.
             This div fills the notch/safe-area gap between the physical screen top and the visible header content,
             preventing page content from bleeding into the notch area. */}
        <div 
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 'calc(env(safe-area-inset-top, 0px) + 4px)',
            backgroundColor: isMenuOpen ? 'transparent' : (isScrolled ? 'var(--rg-bg)' : 'var(--rg-invert-bg)'),
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        <Link
          href="/"
          style={{
            pointerEvents: 'auto',
            transition: 'color 400ms',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isMenuOpen ? (
            <div className="flex items-center" style={{ height: '32px', overflow: 'visible' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logos/Raymondgraylogo169WhiteNoBG.png" 
                alt="Raymond Gray" 
                className={`object-contain transition-all duration-500 ease-out transform ${
                  isScrolled ? "scale-[1.5] md:scale-[1.8]" : "scale-[1.8] md:scale-[2.2]"
                }`}
                style={{
                  height: '100%',
                  width: 'auto',
                  transformOrigin: 'left center',
                  padding: '4px 0',
                }}
              />
            </div>
          ) : (
            <div className="flex items-center" style={{ height: '32px', overflow: 'visible' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={isScrolled || isLegalPage ? "/images/logos/RaymondgraylogoNoBG.png" : "/images/logos/Raymondgraylogo169WhiteNoBG.png"}
                alt="Raymond Gray" 
                className={`object-contain transition-all duration-500 ease-out transform ${
                  isScrolled ? "scale-[1.5] md:scale-[1.8]" : "scale-[1.8] md:scale-[2.2]"
                }`}
                style={{
                  height: '100%',
                  width: 'auto',
                  transformOrigin: 'left center',
                  padding: '4px 0',
                }}
              />
            </div>
          )}
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
            className="rg-nav-login hidden md:inline-block"
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
            Book
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
