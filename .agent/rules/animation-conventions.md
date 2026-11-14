# Animation Conventions — E-Cell MITAOE

## 1. Responsibilities
- **2D Canvas:** Full-viewport kinetic circular text spiral (Stage 01) and aperture reveal (Stage 02) at 60 fps with device pixel ratio scaling (`dpr = Math.min(window.devicePixelRatio || 1, 2)`).
- **GSAP + ScrollTrigger:** Pinned scenes, scroll scrubbing, coordinate transforms, progress mapping.
- **Lenis:** Smooth inertia scrolling synchronized with GSAP's ticker.
- **Framer Motion:** Component-level micro-interactions, modals (`EventModal`, `JoinModal`, `SearchModal`), drawer toggles.

## 2. Aperture Mathematics
- Aperture hole radius calculation:
  $$R_{\text{aperture}}(p) = \begin{cases} 0 & p < 0.05 \\ \left(\frac{p - 0.05}{0.95}\right)^{1.9} \cdot R_{\text{max}} & p \ge 0.05 \end{cases}$$
- Canvas blend mode: `ctx.globalCompositeOperation = 'destination-out'` punches out transparent pixels, rendering the DOM Title Screen (`TitleScreen.tsx`) directly through the aperture.

## 3. Hygiene & Cleanup
- Always clean up GSAP ScrollTriggers and ticker listeners on unmount.
- Always cancel `requestAnimationFrame` on unmount.
- Respect `prefers-reduced-motion` media queries.
