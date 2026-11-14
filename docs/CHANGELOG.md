# Changelog

All notable changes to the E-Cell MITAOE web platform are documented in this file.

## [2.1.0] - 2026-11-14

### Added
- **Reversible GSAP ScrollTrigger Spiral Stage**:
  - Pinned `380vh` track synchronizing normalized scroll progress $p \in [0, 1]$ directly with spiral scale, rotation, and aperture expansion.
  - Symmetrical reverse scrubbing: scrolling up now reverses the aperture and returns to the initial split hero.
  - Offscreen canvas rasterization buffer for the micro dot grid, reducing canvas draw calls from 1,500+ down to a single hardware blit per frame.
  - Caching of `CanvasRenderingContext2D` in `ctxRef.current`.
  - Frustum culling of text characters outside canvas viewport.
  - Synchronized click-and-hold momentum scroll with circular SVG progress ring.
- **Server Component Architecture**:
  - Converted `src/app/page.tsx` from a client component into a pure Server Component.
  - Introduced `ModalProvider` React Context at `src/components/modals/ModalContext.tsx` to isolate `EventModal`, `JoinModal`, and `SearchModal` without client-rendering static sections.
  - Updated `Navbar`, `HeroSection`, `FeaturedEvents`, and `JoinCtaSection` to consume `useModals()`.
- **Editorial Design System & Typography**:
  - Integrated `Space Grotesk` (display headings), `DM Sans` (editorial body copy), and `IBM Plex Mono` (technical metadata).
  - Configured design tokens for canvas light (`#F7F9FF`), deep navy (`#102A56`), electric blue (`#155EEF`), and obsidian dark (`#07090E`).
- **Containerization & Deployment Infrastructure**:
  - Enabled Next.js `output: 'standalone'` in `next.config.js`.
  - Added multi-stage production `Dockerfile` with non-root security context (`nextjs:nodejs`, UID 1001).
  - Added `.dockerignore` and production `docker-compose.yml` with healthchecks and resource limits.
  - Added complete Kubernetes manifests in `k8s/` (`deployment.yaml`, `service.yaml`, `ingress.yaml`, `kustomization.yaml`).
- **Documentation Suite in `docs/`**:
  - `docs/CODEBASE_AUDIT.md`
  - `docs/ARCHITECTURE.md`
  - `docs/UI_REDESIGN_REPORT.md`
  - `docs/PERFORMANCE_AUDIT.md`
  - `docs/PERFORMANCE_AFTER.md`
  - `docs/DOCKER_GUIDE.md`
  - `docs/KUBERNETES_GUIDE.md`
  - `docs/TEST_REPORT.md`
  - `docs/CHANGELOG.md`

### Changed
- Refactored `SpiralIntroStage.tsx` to eliminate all `useState` calls from the animation loop, reducing React re-renders from 60/sec to 0/sec.
- Replaced one-way intro dismissal (`sessionStorage` / `isIntroDismissed`) with continuous bidirectional scroll scrubbing.
- Updated `SearchModal.tsx` to support optional callbacks with router navigation fallback.

### Fixed
- Fixed 60fps frame stutter during spiral zoom.
- Fixed canvas context thrashing on every frame.
- Fixed Next.js font warning by moving font import to `globals.css`.
- Fixed Next.js build type check error on `EventModal`.
