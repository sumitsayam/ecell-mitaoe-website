# Project Architecture Rules — E-Cell MITAOE

## 1. Core Framework & Environment
- **Framework:** Next.js 14.2 (App Router).
- **React & TypeScript:** React 18.3, TypeScript 5.6 strict mode.
- **Styling Engine:** Tailwind CSS 3.4 with custom design tokens.
- **Motion Engine:** GSAP 3 + ScrollTrigger for pinned scroll timelines; Lenis for smooth scrolling; 2D Canvas for high-performance circular kinetic typography.

## 2. Directory Conventions
- `src/app/`: File-system routes, metadata, and page layouts.
- `src/components/intro/`: 4-Stage opening sequence (`SpiralIntroStage.tsx`, `TitleScreen.tsx`).
- `src/components/sections/`: Modular homepage storytelling chapters (`HeroSection`, `LedgerSection`, `FeaturesGrid`, `EcosystemExplorer`, `FinalSpiralSection`, etc.).
- `src/data/`: Strictly typed, audited institutional datasets (`events.ts`, `team.ts`, `initiatives.ts`, `achievements.ts`, `resources.ts`, `insights.ts`).

## 3. Strict Boundary Rules
- Do NOT introduce Three.js or heavy 3D bundles when 2D canvas/SVG achieves superior framerates.
- Do NOT mix competing animation libraries on the same DOM element.
- Keep all data separate from presentation.
- Never invent unverified institutional statistics or fake member profiles.

