---
name: spiral-motion-system
description: High-performance 2D Canvas concentric text spiral and aperture reveal implementation.
---

# Spiral Motion System Skill

Use this skill when modifying, tuning, or rendering circular kinetic typography and aperture zoom transitions.

## Architecture
- Render 12 concentric circular text orbits using HTML5 2D Canvas.
- Scale canvas width/height by device pixel ratio (`dpr = Math.min(window.devicePixelRatio || 1, 2)`).
- Interpolate angular rotation with `requestAnimationFrame` delta time.
- Cut circular openings using `ctx.globalCompositeOperation = 'destination-out'` to reveal underlying DOM layers without DOM re-layout.
- Track pointer with floating pill cursor (`CLICK & HOLD` / `DIVING xx%`).

