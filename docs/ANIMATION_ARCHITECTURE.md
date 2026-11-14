# E-Cell MITAOE — Animation Architecture

## 1. Technological Specialization
To avoid library collisions and maintain 60 fps, each animation technology has a single, strictly bounded responsibility:

```
[HTML5 2D Canvas]
  ├── Kinetic typography spiral rendering
  ├── Dynamic DPR scaling (supporting up to 2x Retina)
  ├── 12 concentric orbits with opposing angular speeds
  └── Aperture punch with destination-out blending

[GSAP 3 + ScrollTrigger]
  ├── Pinned stage timelines (400-450svh scroll track)
  ├── Smooth scrub mapping
  └── Section-level entrance transitions

[Lenis]
  ├── Inertia-based smooth scrolling
  └── Synchronization with GSAP ticker loop

[Framer Motion]
  ├── Modal dialog entrances (EventModal, JoinModal, SearchModal)
  └── Mobile menu drawer transitions
```

## 2. Mathematical Aperture Model
As interaction progress $p$ increases from $0.0$ to $1.0$:
- **Ring Zoom Scale:**
  $$\text{zoomScale}(p) = 1 + 14 \cdot p^{2.3}$$
- **Aperture Punch Radius:**
  $$R_{\text{aperture}}(p) = \begin{cases} 0 & p < 0.05 \\ \left(\frac{p - 0.05}{0.95}\right)^{1.9} \cdot R_{\text{max}} & p \ge 0.05 \end{cases}$$
  where $R_{\text{max}} = \frac{\sqrt{W^2 + H^2}}{2} + 80$.

## 3. Performance & Memory Hygiene
- All canvas frames calculate motion based on delta time: $\Delta t = \min(0.04, (t - t_{\text{last}}) / 1000)$.
- Inactive offscreen canvas glyphs are culled before matrix transforms.
- All tickers, wheel listeners, and animation frames are terminated on component unmount.

