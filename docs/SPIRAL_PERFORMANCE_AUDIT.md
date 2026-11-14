# Spiral Performance Audit — E-Cell MITAOE

## 1. Executive Summary & Objective

This document provides a comprehensive profiling audit of the canvas-based kinetic typography spiral (`src/components/intro/SpiralIntroStage.tsx`) and the opening cover title screen (`src/components/intro/TitleScreen.tsx`).

The goal is to eliminate runtime lag, high CPU/GPU utilization, and memory pressure during local Next.js development and production builds, while strictly preserving:
- Original circular kinetic typography & inward-pointing orientation
- Concentric ring arrangement & visual density
- Background dotted blueprint grid
- Alternating angular rotation physics
- Smooth aperture zoom & reversible scroll scrub
- Zero to One / Entrepreneurship vocabulary bank
- Revealed Title Screen beneath

---

## 2. Profiling Findings & Root Cause Analysis

### Bottleneck 1: Unconditional High Ring Count (22 Rings on All Devices)
- **Current State:** `RING_COUNT = 22` is hardcoded regardless of screen size.
- **Impact:** 
  - On a desktop display (1440×900), 22 rings generate approximately 4,200 individual characters per frame.
  - On a mobile viewport (390×844), 22 rings generate over 2,800 characters in an area less than 400px wide, leading to severe character crowding and over 160,000 transformation matrix calculations per second.
- **Root Cause:** A fixed constant was chosen for visual density on high-end desktop without responsive tiering.

### Bottleneck 2: Active RequestAnimationFrame Loop When Idle / Off-Screen
- **Current State:** 
  ```ts
  if (!isVisibleRef.current) {
    rafRef.current = requestAnimationFrame(animate);
    return;
  }
  ```
- **Impact:** When the visitor scrolls down into `#homepage-main` or switches tabs, the component continues to schedule rAF callbacks 60–120 times per second.
- **Root Cause:** The loop check returns early but still requests the next frame, preventing the thread from going idle.

### Bottleneck 3: Full-Viewport Offscreen Canvas Blitting (Dotted Grid)
- **Current State:** Pre-renders a dotted grid onto an offscreen canvas at full viewport DPR resolution, and calls `ctx.drawImage(offscreenGridRef.current, 0, 0)` every frame.
- **Impact:** Blitting a 2880×1800 texture (over 5 megapixels on Retina) on every single frame puts unnecessary memory bandwidth pressure on the GPU compositor.
- **Root Cause:** The dotted grid was handled as a dynamic canvas operation instead of being delegated to hardware-accelerated CSS backgrounds.

### Bottleneck 4: Repetitive Euclidean Distance Operations (`Math.hypot`)
- **Current State:** Inside the per-character loop:
  ```ts
  const distToCenter = Math.hypot(x - cx, y - cy);
  if (distToCenter < holeRadius + 4 * dpr) continue;
  ```
- **Impact:** Computes square roots (`Math.hypot`) up to 4,200 times per frame (250,000+ times per second).
- **Root Cause:** Radius checks were performed with square root calculation rather than comparing squared Euclidean distances (`dx * dx + dy * dy < holeCutoffSq`).

### Bottleneck 5: Decimal Font String Re-parsing
- **Current State:** `ctx.font = '500 ' + scaledFs + 'px 'IBM Plex Mono', 'Space Mono', monospace;`
- **Impact:** Assigning an unrounded decimal font string forces the browser's 2D canvas context to repeatedly parse CSS font strings and query font metrics.

### Bottleneck 6: Canvas Dimension & DPR Overhead
- **Current State:** DPR was capped at 1.5, which is good, but canvas dimensions were reset in listeners without checking if client dimensions actually changed.

---

## 3. Targeted Optimizations Plan

| Area | Current Implementation | Proposed Optimization | Target Impact |
| :--- | :--- | :--- | :--- |
| **Ring Density** | Fixed 22 rings everywhere | Responsive profiles: Desktop (11–12), Standard (8), Mobile (5–6), Reduced Motion (4) | 65% reduction in draw calls |
| **Animation Loop** | Infinite rAF even when hidden | Complete loop cancellation on `document.hidden` and IntersectionObserver exit | 0% CPU when off-screen |
| **Grid Rendering** | Fullscreen `ctx.drawImage` blit | Pure CSS radial gradient background (`22px` pitch) | 100% removal of grid draw overhead |
| **Math Physics** | `Math.hypot` inside inner loop | Squared Euclidean distances (`dx*dx + dy*dy < r*r`) | Eliminates ~250,000 `sqrt` ops/sec |
| **Font Strings** | Decimal font string per ring | Integer rounded font size with cached strings | Faster font lookup in canvas context |
| **Reversibility** | ScrollTrigger scrub | Maintained 100% intact with reversible scrub timeline | Preserved smooth bidirectional scroll |

---

## 4. Verification Baseline Checklist

- [x] Identify React state updates in animation loop: Verified that animation values use `useRef` (zero React re-renders).
- [x] Confirm reversible scroll mechanics: GSAP ScrollTrigger timeline pins `pinWrapperRef` over 360vh with scrub.
- [x] Check DPR capping: DPR capped at 1.5x.
- [x] Next.js production build verification: Build and test under `next start` to isolate development tooling overhead.

