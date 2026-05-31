# Public-Pages Editorial Redesign — Corrected & Elevated Plan

**Branch:** `preview`
**Scope:** Public marketing surface only (`/`, `/book`, and new `/privacy`, `/terms`, `/faqs`). Portal/admin/technician surfaces are out of scope.
**Constraints (hard):** Keep the existing brand fonts (Gotham display, Montserrat, public-mono) and the `rg-*` theme palette. No new color identities. Increase spacing and content density toward an editorial, premium, service-industry aesthetic.

> This document supersedes the original `implementation_plan.md`. The original was home-page-only and omitted the footer, legal pages, FAQs, navigation, brand-token discipline, accessibility, performance, and image specs. It also pre-dated the work already merged onto `preview`.

---

## 1. Reconciliation — what is already done on `preview`

| Item | Status | Notes |
|---|---|---|
| `Marquee` infinite-scroll utility | ✅ Done | `sections/Marquee.tsx`, used on home |
| `CarouselSection` (drag carousel) | ✅ Done | `sections/CarouselSection.tsx`, used on home |
| `PageHero` parallax + asymmetric 12-col grid | ✅ Done | Good quality; uses scroll-linked parallax + masked reveal |
| `SplitFeature`, `PillarRows`, `CalloutSlab` motion upgrades | ✅ Done | Verify reduced-motion + responsive |
| `globals.css` spacing/type scale enlargement | ✅ Done | `--rg-pad-x`, `--rg-section-y`, display sizes increased |
| Form polish (`FormElements`, `AdvancedFormContainer`, `/book`) | ✅ Partial | Floating labels added; multi-step + success micro-interaction still TODO |
| 6 redesign images generated | ✅ Done | `hero, abstract, bento, carousel_charging, carousel_workshop, carousel_van` |
| **Logo assets copied** | ✅ Done (this pass) | `public/images/logos/*` — fixed broken `TopNav` + `Footer` logo 404 |
| **Stray `update_css.js` removed** | ✅ Done (this pass) | Build/lint hygiene |

## 2. Reconciliation — gaps the original plan missed (TODO)

| Item | Priority | Why |
|---|---|---|
| **Footer wired into layout + customized for this microsite** | P0 | `Footer.tsx` is a verbatim platform copy; its links (IFM, portfolio, portals) 404 here. Not rendered on any page. |
| **`/privacy`, `/terms`, `/faqs` pages** | P0 | Explicitly requested; ported from platform and adapted for vehicle services |
| **Navigation links to legal/FAQ** | P0 | `TopNav` already has `isLegalPage` logic but no links wired |
| **Brand-token harmonization** | P1 | Redesign mixes generic `bg-foreground/text-background` with `rg-*`. Standardize to avoid palette drift in dark mode |
| **Booking flow: multi-step + success state** | P1 | Plan promised it; only floating labels landed |
| **Reduced-motion + a11y pass** | P1 | Parallax/marquee/carousel must respect `prefers-reduced-motion`; carousel needs keyboard + ARIA |
| **Per-section editorial content expansion** | P1 | "Maximum content": add Stat strip, Process timeline, FAQ teaser, testimonial/quote slab to home |
| **SEO/OG metadata + sitemap/robots** | P2 | Per-page metadata, OpenGraph image, `sitemap.ts`, `robots.ts` |
| **Performance budget** | P2 | Image `sizes`, lazy below-fold, avoid layout thrash on scroll |

---

## 3. Elevated design principles (the "editorial, professional" bar)

1. **Typographic hierarchy as layout.** Oversized display headings (already enlarged) paired with a restrained mono eyebrow and a single lede paragraph. One idea per section.
2. **Asymmetric editorial grids.** 12-column grids with intentional empty space; content hangs off a vertical rule (as the new `PageHero` does). Reuse that motif across sections.
3. **Generous, rhythmic whitespace.** `--rg-section-y: clamp(100px,15vw,240px)` gives breathing room; keep vertical rhythm consistent between sections.
4. **Motion with restraint.** Scroll-reveal, parallax, marquee, magnetic CTA — all subtle, all gated behind `prefers-reduced-motion: reduce`.
5. **One accent, used sparingly.** `--rg-accent` (coral) for emphasis/CTAs only; never as a fill field.
6. **Photography as texture, not decoration.** Duotone/overlay-blended imagery (the hero already uses `mix-blend-overlay`) keeps a cohesive, premium tone.
7. **Token discipline.** Every color = an `rg-*` or the brand-mapped semantic token. No raw hex, no default Tailwind grays.

---

## 4. Page-by-page spec

### 4.1 Home (`/`) — expand to "maximum content"
Current order: Hero → Marquee → SplitFeature ×2 → CarouselSection → PillarRows → CalloutSlab → FinalCTA.
**Add (editorial density):**
- **StatStrip** after Hero/Marquee — 3–4 proof metrics (e.g., "1 team · ICE + EV", "PPM-backed", "Documented service history", "IFM-integrated"). Component exists (`sections/StatStrip.tsx`).
- **ProcessTimeline** before CalloutSlab — "Assess → Source/Service → Document → Report" (component exists).
- **QuoteSlab / testimonial** — one strong client/operating-principle quote (reuse `QuoteSlabSection` pattern).
- **FAQ teaser** (3 questions) linking to `/faqs`.
- Harmonize all section backgrounds to alternate `--rg-bg` / `--rg-bg-2` / inverted slab using `rg-*` tokens.

### 4.2 Booking (`/book`)
- Multi-step (Vehicle → Service type → Contact → Confirm) with staggered reveal between steps.
- Floating-label inputs (done) + inline validation.
- Success state: animated checkmark morph + confirmation summary.
- Keep `AdvancedFormContainer` as the shell; ensure mobile single-column.

### 4.3 NEW `/privacy` & `/terms`
- Port platform `privacy/page.tsx` (141 lines) and `terms/page.tsx` (118 lines).
- Wrap in `PageHero` (compact variant) + a readable prose column (`max-w-[72ch]`, `rg-body`).
- Adapt entity references: keep **Raymond Gray Limited, Accra, Ghana**; swap service language to EV & Automotive; contact `automechanic@raymond-gray.org`.
- `TopNav` switches to dark-on-light logo via existing `isLegalPage`.

### 4.4 NEW `/faqs`
- Port platform `faqs/page.tsx` (framer-motion accordion) + `faqs/layout.tsx`.
- Replace facilities-management Q&A with vehicle-services Q&A (sourced from `RG_06_EV_Automotive_Services.docx.txt`): EV sales independence, PPM scope, ICE servicing, fleet management, charging infrastructure, IFM integration, booking & turnaround, coverage area.
- Respect reduced-motion for expand/collapse.

### 4.5 Footer (all pages)
- Wire `<Footer/>` into `src/app/layout.tsx` (after `{children}`) so it renders site-wide.
- **Customize link columns for this microsite:**
  - *Services*: EV Sales, EV Maintenance, ICE Servicing, Fleet Management, Charging Infrastructure (anchor links to home sections).
  - *Company*: FAQs (`/faqs`), Book a Service (`/book`), Contact (`mailto:automechanic@raymond-gray.org`).
  - Remove the Portals column (no portal in this site).
- Logo: `RaymondgraylogoNoBG.png` (now present), inverted on the dark footer.
- Bottom row: "Raymond Gray Limited · Accra, Ghana", Privacy/Terms links, dynamic © year.

### 4.6 Navigation (`TopNav` / `OverlayMenu`)
- Menu items: section anchors (EV Sales, Maintenance, ICE, Fleet, Charging) + FAQs + Book a Service.
- Ensure overlay menu lists the new routes; keep the in-view section tracker.

---

## 4b. Animation engines — framer-motion + GSAP
Both libraries are used, with clear lanes to avoid conflict:
- **framer-motion** — component enter/exit, layout animations, `AnimatePresence` (accordion, pillar morph, reveals).
- **GSAP + ScrollTrigger** — scroll-driven work: scrubbed timelines, section pinning, parallax, and line/word reveals.
- Setup lives in `src/lib/gsap.ts` (registers `ScrollTrigger` once; kills all scroll motion under `prefers-reduced-motion`). Components import `gsap`/`ScrollTrigger` from there, never from `"gsap"` directly.
- First integration: `ScrollProgress` (top accent bar, scrubbed). Planned next (interactions phase): GSAP-scrubbed hero parallax (replacing the framer `useScroll` version to avoid duplication), pinned stat/process sections, and SplitText-style heading reveals.

## 5. Brand-token harmonization (correction)
The redesign introduced `bg-foreground` / `text-background` / `from-background`. These map to brand values **inside `.rg-public`** today, but to keep dark-mode and future theming safe:
- Prefer `bg-rg-invert-bg text-white` (or the documented `rg-*` inversion classes) for dark slabs, matching `CalloutSlab`/`FinalCtaSection`.
- Where semantic tokens are kept, confirm `--background`/`--foreground` inside `.rg-public` resolve to brand values in **both** light and dark blocks of `globals.css`.

---

## 6. Image generation specs

> GPT Image 2 is not available to me here. Generate these externally (GPT Image 2 / Firefly / etc.) and drop them at the paths below. Style for **all**: cinematic, desaturated/duotone-friendly, professional automotive/industrial, cool neutral tones that sit under the coral accent; no text, no logos, no watermarks.

### 6.1 Already present (reuse — no action)
`public/images/redesign/{hero,abstract,bento,carousel_charging,carousel_workshop,carousel_van}.png`

### 6.2 New images to generate

| Filename (place in `public/images/redesign/`) | Aspect | Resolution | Used in | Prompt |
|---|---|---|---|---|
| `stat-texture.png` | 16:9 | 1920×1080 | StatStrip bg (subtle) | "Abstract dark brushed-metal and carbon texture, soft directional light, ultra-minimal, cinematic, desaturated cool gray, no text." |
| `process-aerial.png` | 3:2 | 1800×1200 | ProcessTimeline band | "High-angle aerial of a clean modern vehicle depot at dusk, mixed EV and vans parked in ordered rows, soft fog, muted teal-gray palette, cinematic, no logos." |
| `quote-bg.png` | 21:9 | 2520×1080 | QuoteSlab inverted slab | "Extreme close-up of an EV charging connector locking into a port, shallow depth of field, dramatic rim light, dark moody background, premium automotive editorial, no text." |
| `faq-hero.png` | 16:9 | 1920×1080 | `/faqs` PageHero | "Minimalist studio shot of a technician's gloved hands with a diagnostic tablet over an engine bay, cool lighting, lots of negative space top-left, editorial, no text." |
| `legal-hero.png` | 16:9 | 1920×1080 | `/privacy` + `/terms` PageHero | "Quiet architectural detail of a modern automotive facility facade, concrete and glass, overcast soft light, muted, lots of negative space, no text, no people." |
| `book-hero.png` | 3:2 | 1800×1200 | `/book` PageHero | "Service advisor greeting a client beside a clean EV in a bright modern service bay, warm-neutral professional tone, candid, no text, no logos." |
| `og-default.png` | 1.91:1 | 1200×630 | OpenGraph/social card | "Cinematic wide shot of a mixed EV + commercial fleet lined up, dusk, cool palette, generous empty sky for overlay text, no text baked in." |

If you'd prefer, I can generate any of these now via an available image tool (different model than GPT Image 2) — say the word.

---

## 7. Accessibility, performance, SEO (new in this plan)
- **Reduced motion:** wrap parallax/marquee/carousel/reveal in a `prefers-reduced-motion` guard (CSS already has a block; ensure JS-driven motion checks it too).
- **Keyboard/ARIA:** carousel = `role="region"` + arrow-key nav + visible focus; accordion = `button[aria-expanded]`.
- **Contrast:** verify white-on-image lede passes AA over the gradient (the hero gradient helps).
- **Performance:** correct `sizes` on every `next/image`; `priority` only on the LCP hero; lazy-load below-fold; avoid animating layout-affecting properties (use transform/opacity).
- **SEO:** per-page `metadata` + `openGraph` using `og-default.png`; add `src/app/sitemap.ts` and `robots.ts`.

---

## 8. Execution order
1. ✅ Logos copied, stray script removed.
2. Footer: wire into layout + customize for microsite. *(P0)*
3. Legal pages `/privacy`, `/terms` (ported + adapted). *(P0)*
4. `/faqs` (ported accordion + vehicle Q&A). *(P0)*
5. Nav links to FAQs/Book/legal. *(P0)*
6. ✅ Token harmonization across redesigned sections — `PageHero`, `CalloutSlab`, `SplitFeature`, `PillarRows` now use `rg-*` tokens only (no generic `foreground`/`background`/`card`/`accent`/`border`). **+ GSAP foundation added** (`src/lib/gsap.ts`, `ScrollProgress` bar).
7. ✅ Home content expansion — **Marquee removed** (too similar to main site) and replaced with a GSAP scroll-staggered **`CapabilityIndex`**; added **`StatStrip`**, **`ProcessTimeline`** ("How we work"), and **`FaqTeaser`**. *(QuoteSlab still optional/pending.)*
   - ✅ **Font wiring fixed** — `globals.css` now points at the loaded `--font-gotham` (display) / `--font-montserrat` (body) vars; removes the self-referential `--font-display: var(--font-display)` cycle so Gotham + Montserrat actually apply.
   - ✅ **Hero legibility fixed** — added a base darken layer + stronger gradient over the hero image and raised eyebrow/lede opacity (`white/75`, `white/90`) so right-column copy is readable over bright image areas.
   - ✅ Footer logo left-padding added.
8. Booking multi-step + success state. *(P1)*
9. a11y + reduced-motion + performance pass. *(P1)*
10. SEO/OG/sitemap. *(P2)*
11. Build + screenshot verification of every public route.

## 9. Verification
- `next build` green; every route prerenders.
- Screenshot `/`, `/book`, `/privacy`, `/terms`, `/faqs` at desktop + mobile widths.
- Confirm 0 broken images (logo, redesign, hero), 0 mojibake, AA contrast, reduced-motion honored.
