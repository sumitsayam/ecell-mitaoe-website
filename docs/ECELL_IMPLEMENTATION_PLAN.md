# E-Cell MITAOE — Implementation Plan & Phase Breakdown

## Phase 01: Audit & Motion Foundation
- Inspect existing codebase and remove stale leftover artifacts.
- Install GSAP and Lenis for pinned scroll timelines and inertia scrolling.
- Re-architect the opening spiral as a dedicated 2D Canvas component (`SpiralIntroStage.tsx`).

## Phase 02: Design Tokens & Typography Scale
- Replace cream/navy tokens with the designated Blue-White system (`#F8FAFF`, `#FFFFFF`, `#101B32`, `#155EEF`, `#0B347C`, `#E7F0FF`, `#6B7890`, `#DCE5F2`, `#0B1020`).
- Configure Sora (display), Plus Jakarta Sans (body), and IBM Plex Mono (metadata).

## Phase 03: The 4-Stage Opening Sequence
- Stage 01: Full-viewport kinetic typography spiral with 12 concentric orbits and micro-dot blueprint grid.
- Stage 02: Aperture zoom reveal using `globalCompositeOperation = 'destination-out'`.
- Stage 03: Minimal Title Screen (`TitleScreen.tsx`) with layered physical paper sheets.
- Stage 04: Continuous scroll transition into the editorial homepage.

## Phase 04: Editorial Storytelling Homepage
- Hero Section: `BUILD WHAT'S NEXT.` with Opportunity Deck.
- Entrepreneurship Ledger: 001 / DISCOVER to 005 / LAUNCH.
- What We Believe: 001–010 editorial feature blocks.
- Ecosystem Explorer: Interactive file tree with live previews.
- Section 11: Final returning spiral (`FinalSpiralSection.tsx`).

## Phase 05: Complete Route Architecture & Dynamic Pages
- Deploy `/contact`, `/insights`, `/insights/[slug]`, and `/initiatives/[slug]`.
- Verify all 22 static and dynamic routes.

## Phase 06: Quality Assurance & Automated Verification
- Run `npm run build` to verify clean static compilation.
- Execute `node scripts/test-server.js` and `node scripts/test-assets.js`.

