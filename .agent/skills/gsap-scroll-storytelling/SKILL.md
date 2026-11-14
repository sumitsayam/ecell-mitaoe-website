---
name: gsap-scroll-storytelling
description: Continuous pinned scroll sequences, ScrollTrigger synchronization, and Lenis smooth scrolling.
---

# GSAP Scroll Storytelling Skill

Use this skill when orchestrating multi-stage scroll narratives, pinned viewport stages, and Lenis smooth scroll synchronization.

## Architecture
- Register `ScrollTrigger` with GSAP.
- Connect Lenis scroll events to `ScrollTrigger.update`.
- Pipe `gsap.ticker` into `lenis.raf`.
- Pin storytelling stages using `pin: true` and scrub values between `0.5` and `1.0`.
- Always call `scrollTriggerInstance.kill()` and `lenis.destroy()` on component unmount.
