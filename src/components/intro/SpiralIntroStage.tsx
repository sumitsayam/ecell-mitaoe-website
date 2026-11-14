'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import TitleScreen from './TitleScreen';
import { ArrowDown, Sparkles } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────
 *  SpiralIntroStage — Signature Concentric Editorial Spiral
 *
 *  Faithfully reproduces the interaction and pacing of contentarchitecture.dev:
 *  • Full-screen dark canvas (#07090E) with subtle 22px pitch dot grid
 *  • 9 concentric rotating text rings centered in viewport (cx = w/2, cy = h/2)
 *  • Phrase: 'ENTREPRENEURSHIP CELL · MIT AOE PUNE · BUILDERS · IDEAS INTO IMPACT · '
 *  • Tops of characters point inward toward center (rot = theta - PI/2)
 *  • Reads left-to-right at the bottom
 *  • Alternate rings spin in opposite directions with calibrated angular velocities
 *  • 1.8s single-pass scattered letter reveal on load (organic gappy matrix look)
 *  • Floating architectural capsule header at top with navigation links + marquee
 *  • Interactive "CLICK & HOLD" / "SCROLL TO DIVE" pill with circular SVG progress
 *  • "LEARN MORE" pill at bottom-right
 *  • Reversible GSAP ScrollTrigger aperture zoom:
 *    - Circular hole punches cleanly through canvas with destination-out
 *    - Sharp white glowing ring borders the aperture
 *    - Reveals TitleScreen ('PLATE 001 // IDENTITY - MITAOE E-CELL') strictly inside the circle
 *    - Expands smoothly to 100% viewport, transitioning seamlessly into the homepage
 * ────────────────────────────────────────────────────────────────────── */

const RING_COUNT = 9;
const REPEATED_PHRASE = 'ENTREPRENEURSHIP CELL · MIT AOE PUNE · BUILDERS · IDEAS INTO IMPACT · ';

interface RingData {
  radius: number;
  fontSize: number;
  charCount: number;
  speed: number;
  thresholds: Float32Array;
}

interface SpiralIntroStageProps {
  onEnterHome?: () => void;
}

export default function SpiralIntroStage({ onEnterHome }: SpiralIntroStageProps) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const titleScreenWrapperRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const offscreenGridRef = useRef<HTMLCanvasElement | null>(null);

  // UI DOM Refs (Zero React re-renders)
  const topNavRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const exploreBtnRef = useRef<HTMLDivElement>(null);
  const progressRingRef = useRef<SVGCircleElement>(null);

  // Rings dynamic data
  const ringsDataRef = useRef<RingData[]>([]);
  const anglesRef = useRef<Float64Array>(new Float64Array(RING_COUNT));

  // Physics & Animation Refs
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const loadStartTimeRef = useRef<number>(0);
  const revealProgressRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isHoldingRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const dprCapRef = useRef<number>(1.5);
  const reducedMotionRef = useRef<boolean>(false);

  // Scroll to home
  const handleScrollToHome = useCallback(() => {
    if (onEnterHome) {
      onEnterHome();
      return;
    }
    const target = document.getElementById('homepage-main');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onEnterHome]);

  // ── Render Single Frame (60–120 FPS Target) ──
  const renderFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number) => {
    const w = canvas.width;
    const h = canvas.height;
    const p = currentProgressRef.current;

    // Rings are always centered in the viewport
    const cx = w / 2;
    const cy = h / 2;

    // 1. Clear with solid dark background
    ctx.fillStyle = '#07090E';
    ctx.fillRect(0, 0, w, h);

    // 2. Draw cached 22px pitch dot grid (1 blit call)
    if (offscreenGridRef.current) {
      ctx.drawImage(offscreenGridRef.current, 0, 0);
    }

    // 3. Zoom Scale (smooth quadratic acceleration)
    const zoomScale = 1 + Math.pow(p, 2.2) * 11.0;

    // 4. Aperture radius calculation (opens when p > 0.18)
    let holeRadius = 0;
    if (p > 0.18) {
      const apertureProgress = (p - 0.18) / 0.74;
      const maxRadius = Math.hypot(w, h) / 2 + 100 * dpr;
      holeRadius = Math.pow(apertureProgress, 2.1) * maxRadius;
    }

    const reveal = revealProgressRef.current;
    const isRevealComplete = reveal >= 1.0;
    const rings = ringsDataRef.current;
    const angles = anglesRef.current;

    // Set text alignment
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 5. Draw Rings
    for (let k = 0; k < rings.length; k++) {
      const ring = rings[k];
      const scaledR = ring.radius * zoomScale;
      const scaledFs = ring.fontSize * Math.pow(zoomScale, 0.62);

      // Cull whole ring if completely inside aperture
      if (holeRadius > 0 && scaledR + scaledFs < holeRadius) {
        continue;
      }

      // Cull if scaled far out of viewport
      if (scaledR - scaledFs > Math.hypot(w, h) / 2 + 100 * dpr) {
        continue;
      }

      // Smooth alpha fade as aperture grows
      let alpha = 0.88;
      if (p > 0.20) {
        const fadeThreshold = 0.20 + (k / rings.length) * 0.40;
        if (p > fadeThreshold) {
          alpha *= Math.max(0, 1 - (p - fadeThreshold) / 0.35);
        }
      }
      if (alpha <= 0.02) continue;

      ctx.font = `500 ${scaledFs}px 'IBM Plex Mono', 'Space Mono', monospace`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

      const n = ring.charCount;
      const a0 = angles[k];
      const step = (Math.PI * 2) / n;
      const phraseLen = REPEATED_PHRASE.length;
      const thresholds = ring.thresholds;

      for (let i = 0; i < n; i++) {
        // Load-in reveal check during first 1.8s
        if (!isRevealComplete && thresholds[i] > reveal) continue;

        // Angle & Position: theta = a0 - i * (2*PI/n)
        const theta = a0 - i * step;
        const x = cx + scaledR * Math.cos(theta);
        const y = cy + scaledR * Math.sin(theta);

        // Frustum culling: skip letter if outside viewport bounds (+40px)
        if (x < -40 * dpr || x > w + 40 * dpr || y < -40 * dpr || y > h + 40 * dpr) {
          continue;
        }

        // Aperture culling: skip letter if inside hole
        if (holeRadius > 0) {
          const distToCenter = Math.hypot(x - cx, y - cy);
          if (distToCenter < holeRadius + 4 * dpr) continue;
        }

        // Rotation: theta - PI/2 (tops point toward center, reads L to R at bottom)
        const rot = theta - Math.PI / 2;
        const c = Math.cos(rot);
        const s = Math.sin(rot);

        const char = REPEATED_PHRASE[i % phraseLen];

        // Hardware matrix transform without save() and restore()
        ctx.setTransform(c, s, -s, c, x, y);
        ctx.fillText(char, 0, 0);
      }
    }

    // Reset matrix transform once
    ctx.resetTransform();

    // 6. Aperture Punch & Glowing Edge
    if (holeRadius > 2) {
      // Punch circular hole straight through canvas to reveal TitleScreen beneath
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Sharp glowing boundary stroke around aperture
      ctx.beginPath();
      ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 0.75 - (p - 0.18) * 0.85)})`;
      ctx.lineWidth = 1.6 * dpr;
      ctx.stroke();
    }
  }, []);

  // ── Main RAF Animation Loop ──
  const animate = useCallback((timestamp: number) => {
    if (!isVisibleRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, dprCapRef.current);
    const dt = lastTimeRef.current ? Math.min(0.04, (timestamp - lastTimeRef.current) / 1000) : 0.016;
    lastTimeRef.current = timestamp;

    // 1.8s Scattered letter reveal calculation (single pass)
    if (loadStartTimeRef.current === 0) {
      loadStartTimeRef.current = timestamp;
    }
    if (reducedMotionRef.current) {
      revealProgressRef.current = 1.0;
    } else if (revealProgressRef.current < 1.0) {
      const elapsed = (timestamp - loadStartTimeRef.current) / 1800;
      const eased = Math.min(1.0, 1 - Math.pow(1 - Math.min(1, elapsed), 3));
      revealProgressRef.current = eased;
    }

    // Update rotation angles (unless reduced motion)
    if (!reducedMotionRef.current) {
      const rings = ringsDataRef.current;
      const angles = anglesRef.current;
      for (let k = 0; k < rings.length; k++) {
        angles[k] += rings[k].speed * dt;
      }
    }

    // Click & Hold: advance window scroll smoothly
    if (isHoldingRef.current) {
      const scrollStep = 18 * (1 + currentProgressRef.current * 1.8);
      window.scrollBy({ top: scrollStep, behavior: 'auto' });
    }

    // Lerp current progress to actual scroll progress
    const targetP = scrollProgressRef.current;
    currentProgressRef.current += (targetP - currentProgressRef.current) * 0.18;
    const p = currentProgressRef.current;

    // ── Direct DOM updates (zero React re-renders) ──

    // 1. Top Navigation Bar: fades out as user scrolls
    if (topNavRef.current) {
      const topAlpha = Math.max(0, 1 - p * 3.5);
      topNavRef.current.style.opacity = topAlpha.toFixed(3);
      topNavRef.current.style.pointerEvents = topAlpha > 0.1 ? 'auto' : 'none';
      topNavRef.current.style.transform = `translateY(${(-p * 30).toFixed(1)}px)`;
    }

    // 2. Center Pill (CLICK & HOLD)
    if (pillRef.current) {
      const pillAlpha = Math.max(0, 1 - p * 3.2);
      pillRef.current.style.opacity = pillAlpha.toFixed(3);
      pillRef.current.style.pointerEvents = pillAlpha > 0.1 ? 'auto' : 'none';
      pillRef.current.style.transform = `translateY(${(p * 25).toFixed(1)}px)`;
    }

    // 3. SVG Progress Ring
    if (progressRingRef.current) {
      const circumference = 2 * Math.PI * 18;
      const strokeDashoffset = circumference * (1 - p);
      progressRingRef.current.style.strokeDashoffset = strokeDashoffset.toFixed(1);
    }

    // 4. Explore Button (bottom right)
    if (exploreBtnRef.current) {
      const btnAlpha = Math.max(0, 1 - p * 3.5);
      exploreBtnRef.current.style.opacity = btnAlpha.toFixed(3);
      exploreBtnRef.current.style.pointerEvents = btnAlpha > 0.1 ? 'auto' : 'none';
    }

    // 5. TitleScreen pointer events when aperture fully opens
    if (titleScreenWrapperRef.current) {
      titleScreenWrapperRef.current.style.pointerEvents = p > 0.85 ? 'auto' : 'none';
    }

    // 6. Canvas Wrapper (fades at the very end p > 0.88)
    if (canvasWrapperRef.current) {
      const canvasAlpha = p > 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1;
      canvasWrapperRef.current.style.opacity = canvasAlpha.toFixed(3);
      canvasWrapperRef.current.style.pointerEvents = p > 0.85 ? 'none' : 'auto';
    }

    // Render canvas frame
    renderFrame(canvas, ctx, dpr);

    // Stop drawing loop once aperture completely fills viewport
    if (p >= 0.99) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [renderFrame]);

  // ── Setup Canvas, Dot Grid & Mathematical Ring Model ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCapRef.current);
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      canvas.width = w;
      canvas.height = h;

      // ── Calibrated Ring Radii & Typography ──
      const viewportMin = Math.min(rect.width, rect.height);
      const R0 = 0.055 * viewportMin * dpr;

      const newRings: RingData[] = [];
      for (let k = 0; k < RING_COUNT; k++) {
        // R(k) = R0 * 1.34^k
        const radius = R0 * Math.pow(1.34, k);
        const cssRadius = radius / dpr;
        // fs(R) = (8.5 + 0.040 * R_css) * dpr
        const fontSize = (8.5 + 0.040 * cssRadius) * dpr;
        // n = floor(2 * PI * R / (0.68 * fs))
        const charCount = Math.floor((2 * Math.PI * radius) / (0.68 * fontSize));
        // Alternate rings spin in opposite directions: speed = 0.048 / (1 + 0.12k) rad/s
        const speed = (0.048 / (1 + 0.12 * k)) * (k % 2 === 0 ? 1 : -1);

        // Pre-generate random thresholds t in [0, 1] for 1.8s scattered fill-in
        const thresholds = new Float32Array(charCount);
        for (let i = 0; i < charCount; i++) {
          thresholds[i] = Math.random();
        }

        newRings.push({
          radius,
          fontSize,
          charCount,
          speed,
          thresholds,
        });
      }
      ringsDataRef.current = newRings;

      // Pre-render 22px pitch dot grid onto offscreen canvas (1 blit call per frame)
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        const pitch = 22 * dpr;
        const dotRadius = 1 * dpr;
        for (let x = 0; x < w; x += pitch) {
          for (let y = 0; y < h; y += pitch) {
            offCtx.beginPath();
            offCtx.arc(x, y, dotRadius, 0, Math.PI * 2);
            offCtx.fill();
          }
        }
      }
      offscreenGridRef.current = offscreen;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Visibility Listener: pause loop when tab is hidden
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver: pause loop when hero is out of view
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisibleRef.current = entry.isIntersecting && !document.hidden;
      }
    });
    if (pinWrapperRef.current) {
      observer.observe(pinWrapperRef.current);
    }

    // Unified GSAP + Lenis Ticker
    let scrollTriggerInstance: any = null;
    (async () => {
      try {
        const { default: gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        if (pinWrapperRef.current) {
          scrollTriggerInstance = ScrollTrigger.create({
            trigger: pinWrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
              scrollProgressRef.current = self.progress;
            },
          });
        }
      } catch (err) {
        console.error('ScrollTrigger initialization failed:', err);
      }
    })();

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, [animate]);

  // ── Holding Interaction ──
  const startHold = () => { isHoldingRef.current = true; };
  const endHold = () => { isHoldingRef.current = false; };

  return (
    <div
      ref={pinWrapperRef}
      className="relative w-full h-[360vh] bg-[#07090E] select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={stickyContainerRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#07090E]"
      >
        {/* ── UNDERLYING LAYER: Revealed ONLY through central aperture ── */}
        <div
          ref={titleScreenWrapperRef}
          className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none"
        >
          <TitleScreen onScrollCueClick={handleScrollToHome} />
        </div>

        {/* ── CANVAS LAYER: Solid dark background with concentric rotating rings ── */}
        <div
          ref={canvasWrapperRef}
          className="absolute inset-0 w-full h-full z-10 transition-opacity duration-300"
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* ── TOP FLOATING HEADER PILL: Architectural Navigation & Marquee (Reference) ── */}
        <div
          ref={topNavRef}
          className="absolute top-4 sm:top-6 inset-x-0 mx-auto w-fit max-w-[94vw] z-30 transition-opacity duration-300 pointer-events-auto select-none"
        >
          <div className="flex flex-col items-center bg-[#07090E]/85 hover:bg-[#07090E]/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden transition-all">
            {/* Upper Navigation Row */}
            <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border-b border-white/10 font-mono text-[10px] sm:text-xs text-white/80">
              <a
                href="#homepage-main"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToHome();
                }}
                className="flex items-center gap-2 pr-2 sm:pr-3 border-r border-white/15 text-white font-bold hover:text-[#155EEF] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>E-CELL</span>
              </a>
              <a href="#about" className="px-2 py-1 hover:text-white hover:bg-white/5 rounded transition-colors hidden xs:inline">
                ABOUT
              </a>
              <a href="#all-events" className="px-2 py-1 hover:text-white hover:bg-white/5 rounded transition-colors">
                EVENTS
              </a>
              <a href="#initiatives" className="px-2 py-1 hover:text-white hover:bg-white/5 rounded transition-colors hidden sm:inline">
                INITIATIVES
              </a>
              <a href="/ventures" className="px-2 py-1 hover:text-white hover:bg-white/5 rounded transition-colors">
                VENTURES
              </a>
              <a href="/team" className="px-2 py-1 hover:text-white hover:bg-white/5 rounded transition-colors hidden md:inline">
                TEAM
              </a>
              <a href="/contact" className="px-2 py-1 hover:text-white hover:bg-white/5 rounded transition-colors">
                CONTACT
              </a>
            </div>

            {/* Lower Marquee Strip */}
            <div className="w-full overflow-hidden py-1 px-4 bg-white/[0.03] text-[9px] font-mono tracking-wider text-[#94A3B8] whitespace-nowrap flex items-center justify-center gap-3">
              <span className="inline-block animate-pulse w-1.5 h-1.5 rounded-full bg-[#155EEF]" />
              <span>MIT AOE PUNE // CIIE // 2026 COHORT APPLICATIONS OPEN // ₹25L PRE-SEED GRANTS</span>
            </div>
          </div>
        </div>

        {/* ── CENTER INTERACTIVE PILL: CLICK & HOLD ── */}
        <div
          ref={pillRef}
          className="absolute bottom-8 sm:bottom-12 inset-x-0 mx-auto w-fit z-30 transition-opacity duration-300 pointer-events-auto select-none"
        >
          <div
            className="flex items-center gap-3 bg-black/85 hover:bg-black/95 text-white backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-2xl transition-all cursor-pointer group active:scale-95"
            onMouseDown={startHold}
            onMouseUp={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
          >
            {/* Circular SVG Progress Ring */}
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 -rotate-90" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  className="stroke-white/20"
                  strokeWidth="2.5"
                  fill="none"
                />
                <circle
                  ref={progressRingRef}
                  cx="20"
                  cy="20"
                  r="18"
                  className="stroke-[#155EEF] transition-all duration-75"
                  strokeWidth="2.5"
                  strokeDasharray={2 * Math.PI * 18}
                  strokeDashoffset={2 * Math.PI * 18}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <ArrowDown className="w-3 h-3 text-white absolute" />
            </div>

            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-white">
                CLICK &amp; HOLD
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-[#94A3B8]">
                OR SCROLL TO DIVE
              </span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM RIGHT: LEARN MORE / EXPLORE ── */}
        <div
          ref={exploreBtnRef}
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 transition-opacity duration-300 pointer-events-auto hidden sm:block select-none"
        >
          <button
            onClick={handleScrollToHome}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-white/10 text-white/80 hover:text-white border border-white/20 font-mono text-[10px] uppercase tracking-wider transition-all backdrop-blur-md cursor-pointer active:scale-95"
          >
            <span>LEARN MORE</span>
            <ArrowDown className="w-3 h-3 text-[#155EEF]" />
          </button>
        </div>
      </div>
    </div>
  );
}
