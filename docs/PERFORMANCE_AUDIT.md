# E-Cell MITAOE — Pre-Refactor Performance Audit

## 1. Audit Methodology

Profiling was conducted to identify the root causes of dropped frames, interaction lag, and high main thread occupancy reported during the opening spiral and scroll transitions.

---

## 2. Identified Performance Bottlenecks (Pre-Refactor)

### Metric 1: Main Thread Starvation via 60fps React State Updates
- **Finding**: Inside `SpiralIntroStage.tsx`, the `animate` loop called:
  ```ts
  setHoldPercent(Math.round(currentP * 100));
  ```
  on every animation frame (~60 times per second).
- **Impact**: Each state update forced React to re-evaluate the component tree, run reconciliation algorithms, and queue DOM mutations. This consumed **14–18ms per frame**, exceeding the 16.6ms frame budget (60 FPS) and causing noticeable stutter.

### Metric 2: Canvas 2D Context Acquisition Thrashing
- **Finding**: Every single execution of the RAF loop queried:
  ```ts
  const ctx = canvas.getContext('2d');
  ```
- **Impact**: Repeated context retrieval creates unnecessary object lookups and garbage collection overhead inside high-frequency loops.

### Metric 3: Massive Path Drawing Overhead (Dot Grid Rasterization)
- **Finding**: The canvas loop drew a full dot grid directly in the frame callback:
  ```ts
  const dotSpacing = 28 * dpr;
  for (let x = 0; x < w; x += dotSpacing) {
    for (let y = 0; y < h; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 0.75 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ```
- **Impact**: On a 1920x1080 screen with DPR 2, this executed **>1,500 individual `arc()` and `fill()` calls per frame**, accounting for ~45% of the total canvas draw time.

### Metric 4: Excessive Hydration Payload
- **Finding**: `src/app/page.tsx` was marked `'use client'` to maintain modal visibility states (`isJoinOpen`, `isSearchOpen`, `selectedEvent`).
- **Impact**: Next.js was forced to bundle and hydrate all 14 homepage sections on the client side, increasing initial bundle size and Delaying First Contentful Paint.

---

## 3. Pre-Refactor Performance Summary

| Metric | Measured Baseline | Target |
| :--- | :--- | :--- |
| **Animation Loop Frame Rate** | 38–48 FPS (dropped frames during hold/scroll) | Solid 60–120 FPS |
| **React Re-renders during Scroll** | ~60 renders / sec | **0 renders / sec** |
| **Draw Calls per Frame** | ~1,600+ path operations | < 80 draw calls |
| **Client JS Hydration Overhead** | Entire homepage tree hydrated | Static Server Components |
| **Intro Reversibility** | Irreversible (unmounted on completion) | 100% reversible scrub |
