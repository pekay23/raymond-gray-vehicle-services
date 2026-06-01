# Mobile Safe Area + TopNav Pattern

Use this pattern when the mobile top navigation should sit below the iPhone notch and the physical safe area should stay clean/white instead of showing page content behind it.

## Required viewport setting

In `src/app/layout.tsx`, keep:

```ts
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
```

`viewportFit: "cover"` lets the app draw into the physical screen area. After enabling it, the app must explicitly protect the top safe area.

## TopNav structure

Render a fixed safe-area fill outside the header:

```tsx
<div
  aria-hidden="true"
  className="rg-safe-fill"
  data-scrolled={isScrolled}
  data-legal={isLegalPage}
  data-menu-open={isMenuOpen}
/>
```

Then render the topnav below it:

```tsx
<header
  className="rg-public rg-topnav-safe"
  data-scrolled={isScrolled}
>
  ...
</header>
```

For this project, `isScrolled` switches at `scrollY > 12` so the safe area and header become solid at the same moment.

## Safe-area CSS

```css
:root {
  --rg-safe-top: env(safe-area-inset-top, 0px);
  --rg-safe-top: env(safe-area-max-inset-top, env(safe-area-inset-top, 0px));
  --rg-topnav-pad-top: calc(20px + var(--rg-safe-top));
  --rg-topnav-pad-top-scrolled: calc(12px + var(--rg-safe-top));
  --rg-nav-anchor-offset: calc(96px + var(--rg-safe-top));
}

.rg-safe-fill {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--rg-safe-top);
  z-index: 101;
  pointer-events: none;
  background-color: transparent;
  transition: background-color 500ms cubic-bezier(0.16, 1, 0.3, 1);
}

.rg-safe-fill[data-scrolled="true"],
.rg-safe-fill[data-legal="true"] {
  background-color: var(--rg-bg);
}

.rg-safe-fill[data-menu-open="true"] {
  background-color: var(--rg-invert-bg);
}

.rg-topnav-safe {
  padding-top: var(--rg-topnav-pad-top);
}

.rg-topnav-safe[data-scrolled="true"] {
  padding-top: var(--rg-topnav-pad-top-scrolled);
}
```

## If mobile topnav should stay visible

Do not hide the topnav on mobile. Keep the header visible across breakpoints and keep the safe fill visible too:

```tsx
<div className="rg-safe-fill" ... />
<header className="rg-public rg-topnav-safe flex" ... />
```

Avoid putting `rg-public` on any separate mobile-only action bar unless you want its `background: var(--rg-bg)` to paint a white rectangle.

## Why this works

The safe area is a fixed layer that sits above the page and outside the nav. When the nav becomes white/opaque, the safe area becomes white/opaque with it. That prevents hero images or page sections from leaking behind the iPhone notch while keeping the topnav visually attached to the physical top of the screen.
