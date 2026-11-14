# Agent Rules & Architecture Guidelines for E-Cell MITAOE

This file specifies architectural invariants and structural standards for all automated agents and human developers contributing to the E-Cell MITAOE repository.

---

## 1. Folder Structure & Feature Modularity

Components must follow a feature-module architecture rather than a flat dumping ground:

```
src/
├── app/                  # Next.js App Router (Routes compose feature modules)
├── components/
│   ├── ui/               # Generic UI primitives (Button, Badge, Container, Heading)
│   ├── layout/           # Shared layout components (Navbar, Footer, MobileNav)
│   └── modals/           # ModalContext provider and isolated dialog controllers
├── features/             # Domain feature modules
│   ├── ring-dive/        # Pinned 2D canvas spiral and aperture timeline
│   ├── home/             # Homepage specific compositions
│   ├── ventures/         # Venture cards, directories, and stage filters
│   ├── programs/         # Pre-seed grants, makerspace, and IP support
│   ├── events/           # Signature events and timeline archives
│   ├── team/             # Student core leadership and mentor cards
│   └── apply/            # Multi-step application forms with Zod validation
├── content/              # Typed TypeScript content entries (site, ventures, programs, team)
└── lib/                  # Utilities (cn.ts, metadata.ts, constants.ts)
```

### Invariants:
1. **No Logic in `app/page.tsx`**: Route files must strictly compose feature components and fetch data from `content/`.
2. **Feature Encapsulation**: Each feature module exports through its own `index.ts`. No cross-feature internal imports without using public index boundaries.
3. **Absolute Imports**: Always use `@/` alias (e.g. `@/components/ui/Button`). No multi-level relative climbing (`../../..`).

---

## 2. Server Components by Default

- All routes and components are **React Server Components (RSC)** by default.
- Use `'use client'` ONLY for components that require:
  1. Browser APIs (`window`, `canvas`, `requestAnimationFrame`)
  2. Direct user interactivity (search query params, modal state toggles)
  3. Interactive WebGL/Canvas graphics (`SpiralIntroStage`, `BackgroundCubesGrid`)
- Never mark an entire page file with `'use client'` unless strictly necessary. Isolate client state into dedicated providers (`ModalContext.tsx`).

---

## 3. Design Tokens & Styling Rules

- **Tokens Only**: Colors, spacing, borders, and typography must use CSS variables declared in `src/app/globals.css` and mapped via `tailwind.config.ts`.
- **No Hardcoded Hex**: Do not introduce arbitrary inline hex colors in component code.
  - Background: `var(--color-background)` (`#F7F9FF`)
  - Navy: `var(--color-foreground)` (`#102A56`)
  - Primary Blue: `var(--color-primary)` (`#155EEF`)
  - Dark Surface: `var(--color-dark)` (`#07090E`)
- **Typography**:
  - Headings: `font-display` (`Space Grotesk`)
  - Body: `font-sans` (`DM Sans`)
  - Technical / Metadata: `font-mono` (`IBM Plex Mono`)
  - Accent / Italic: `font-serif italic`

---

## 4. Ring-Dive & Canvas Safety

- **Protected Logic**: The 2D canvas hero spiral (`SpiralIntroStage.tsx`) is a high-performance, calibrated mathematical timeline. Do not alter its formulas or add `useState` inside the animation loop unless explicitly asked by the user.
- **Copy Protection**: The desktop copy protection mask (`mask-image: linear-gradient(to right, transparent 0%, transparent 38%, #000 62%)`) must be preserved so ring text never obscures the left-hand copy block.

---

## 5. Pre-Completion Verification Checklist

Before reporting completion or committing changes, execute:
```bash
npm run build   # Must compile with 22/22 routes and 0 TypeScript errors
npm test        # Must pass all route HTTP 200 checks and image payload assertions
```
