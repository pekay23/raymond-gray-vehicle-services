# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The AGENTS.md rule above is load-bearing: this is **Next.js 16.2.6 (App Router, Turbopack)** with breaking changes from older versions. Check `node_modules/next/dist/docs/` before writing framework code.

## Commands

Package manager is **bun** (`bun.lock`). Use bun, not npm/yarn/pnpm.

```bash
bun install            # install deps
bun run dev            # dev server (Turbopack) on :3000
bun run build          # production build (Turbopack)
bun run start -- -p <port>   # serve the production build (defaults to :3000)
bun run lint           # eslint (flat config)
bun add <pkg>          # add a dependency (updates bun.lock)
```

There is **no test suite**. "Verifying" means: `bun run build` (must stay green), then `bun run start -- -p <port>` and check routes / screenshot. Build failures here are real; do not hand-wave them.

## What this project is

A standalone marketing microsite for **vehicleservices.raymond-gray.org** (Raymond Gray's "EV & Automotive Services"). It was extracted from the larger `raymond-gray-platform` repo — that repo's old `/services/vehicle-repairs` page is now a redirect stub pointing here. Canonical marketing copy lives in `raymond-gray-platform/raymond-gray-handoff/project/uploads/RG_06_EV_Automotive_Services.docx.txt`; the pages are a condensed, designed adaptation of it (not verbatim).

This site is **public marketing pages only** — there is no portal/auth/database/API here despite leftover scaffolding (see "Gotchas"). Routes: `/` (home), `/book`, `/faqs`, `/privacy`, `/terms`, plus generated `/sitemap.xml` and `/robots.txt`.

## Architecture

- **`src/app/`** — App Router pages. `layout.tsx` is the single global shell: it loads fonts, sets metadata/icons/OG, and mounts `MotionProvider > ScrollProgress + TopNav + {children} + Footer`. Individual pages render only their own `<main>`; they do **not** include nav/footer.
- **`src/components/public/`** — the marketing component kit. Reusable section primitives live in `src/components/public/sections/` (`PageHero`, `SplitFeature`, `PillarRows`, `CalloutSlab`, `StatStrip`, `ProcessTimeline`, `ImageBand`, `CarouselSection`, `CapabilityIndex`, etc.). Pages are assembled by composing these. Barrels: `@/components/public` and `@/components/public/sections`.
- **`src/components/ui/`** — shadcn/Radix primitives (button, dialog, tabs, …). These legitimately use generic semantic tokens (`bg-background`, `text-foreground`); the marketing kit does **not** (see Styling).
- **Import alias:** `@/*` → `src/*`.

### Animation: two engines, separate lanes
- **framer-motion** — component enter/exit, layout, `AnimatePresence` (accordions, pillar morphs, `Reveal`). Global reduced-motion is handled by `MotionProvider` (`MotionConfig reducedMotion="user"`).
- **GSAP + ScrollTrigger** — scroll-driven work (scrubbed timelines, pinning, parallax). Always import from **`@/lib/gsap`** (never `"gsap"` directly) — it registers the plugin once and kills scroll motion under `prefers-reduced-motion`. Any GSAP-pinned section must also have a CSS `@media (prefers-reduced-motion: reduce)` fallback (see `.rg-carousel-*` in `globals.css`).
- **`SectionNav`** (in-page scroll-spy rail) auto-discovers sections via the `data-screen-label` attribute on section elements — keep that attribute on new full-bleed sections. The `OverlayMenu` is for page-to-page navigation only, not section jumps.

### Styling / brand tokens
- Tailwind v4 (`@theme` in `src/app/globals.css`). The brand system is ~200 `--rg-*` custom properties (`--rg-ink`, `--rg-invert-bg`, `--rg-accent`, …) exposed as `--color-rg-*`, so utilities are `bg-rg-invert-bg`, `text-rg-ink-soft`, `border-rg-line`, etc. **Use `rg-*` tokens in marketing components**, not generic `foreground`/`background`/`card`/`accent` (those drift in dark contexts).
- Fonts: **Gotham** (display) + **Montserrat** (body), wired in `layout.tsx` as `--font-gotham` / `--font-montserrat`. `globals.css` references them via `--rg-display` / `--rg-sans` → `var(--font-gotham/montserrat)`. If you add a font, wire both ends or it silently falls back.

## Gotchas

- **`next.config.ts` sets `typescript.ignoreBuildErrors: true`** — the production build does NOT type-check. Run `npx tsc --noEmit` yourself if you need type safety. IDE may also flag a phantom `Module '"next"' has no exported member 'Metadata'` — it's a stale TS-server artifact; `import type { Metadata } from "next"` builds fine.
- **A `"use client"` page under a passthrough server `layout.tsx` crashes** at runtime with Turbopack ("client reference manifest does not exist", HTTP 500). Pattern: make `page.tsx` a server component that exports `metadata` and renders a separate `"use client"` content component (see `faqs/page.tsx` + `faqs/FaqsContent.tsx`). Do not reintroduce a passthrough layout.
- **Leftover platform scaffolding that is NOT wired here:** `middleware.ts` is a no-op (empty matcher); `src/app/book/page.tsx` POSTs to `NEXT_PUBLIC_API_URL` + `/api/vehicle-bookings` and offers a WhatsApp fallback, but **no API route exists in this repo** and there is no `.env` — bookings rely on that external API or the WhatsApp link. Don't assume a backend.
- **Favicon** is the App Router convention file `src/app/favicon.ico` (the Raymond Gray mark) plus explicit icon/shortcut entries in `layout.tsx` metadata; the create-next-app starter SVGs were removed. Keep it that way so Vercel never shows a default icon.
- **Deploy flow:** GitHub repo is connected to Vercel. `preview` branch → preview deploys; `main` → production. Active redesign work happens on `preview`; production lags until `preview` is merged to `main`. Push triggers the deploy automatically.
- `public/images/old section images/` is git-ignored local backups — never commit or deploy it.
