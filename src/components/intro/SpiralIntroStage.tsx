'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import TitleScreen from './TitleScreen';
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────
 *  SpiralIntroStage — Signature Reversible Editorial Spiral
 *
 *  Mathematically calibrated against the reference:
 *  • R(k) = R0 * 1.28^k, where R0 = 0.05 * min(viewportWidth, viewportHeight)
 *  • fs(R) = 9 + 0.045 * R px
 *  • n = floor(2 * PI * R / (0.66 * fs))
 *  • theta = a0 - i * (2 * PI / n), rotated by (theta - PI/2)
 *  • Letter tops point inward, reading left-to-right at the bottom
 *  • Alternate rings spin opposite: speed = 0.06 / (1 + 0.12k) rad/s
 *  • 1.8s scattered-letter random threshold load-in (single pass)
 *  • Desktop mask: mask-image linear gradient prevents copy overlap
 *  • Mobile layout: centered rings with copy isolated below
 *  • High performance: ctx.setTransform, font set per ring, DPR <= 1.5,
 *    culling inside aperture & outside bounds, zero React renders in RAF
 * ────────────────────────────────────────────────────────────────────── */

const RING_COUNT = 12;
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
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const offscreenGridRef = useRef<HTMLCanvasElement | null>(null);

  // UI DOM Refs (Zero React re-renders)
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
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
  const isDesktopRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const slowFrameCountRef = useRef<number>(0);
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
    const isDesktop = isDesktopRef.current;

    // Center coordinates
    const p = currentProgressRef.current;
    // On desktop, rings center gently at 0.55w initially, transitioning to 0.5w
    const cx = isDesktop ? (w * (0.55 - 0.05 * Math.min(1, p / 0.35))) : (w / 2);
    const cy = h / 2;

    // 1. Clear background
    ctx.fillStyle = '#07090E';
    ctx.fillRect(0, 0, w, h);

    // 2. Draw cached 22px pitch dot grid (1 blit call)
    if (offscreenGridRef.current) {
      ctx.drawImage(offscreenGridRef.current, 0, 0);
    }

    // 3. Zoom Scale
    const zoomScale = 1 + Math.pow(p, 2.2) * 11.0;

    // 4. Aperture radius calculation (p > 0.32)
    let holeRadius = 0;
    if (p > 0.32) {
      const apertureProgress = (p - 0.32) / 0.60;
      const maxRadius = Math.hypot(w, h) / 2 + 80 * dpr;
      holeRadius = Math.pow(apertureProgress, 2.1) * maxRadius;
    }

    const reveal = revealProgressRef.current;
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

      // Cull whole ring if inside aperture
      if (holeRadius > 0 && scaledR + scaledFs < holeRadius) {
        continue;
      }

      // Cull if scaled far out of view
      if (scaledR > Math.hypot(w, h) + 200 * dpr) {
        continue;
      }

      // Fade out outer rings as aperture expands
      let alpha = 0.88;
      if (p > 0.25) {
        const fadeThreshold = 0.25 + (k / rings.length) * 0.45;
        if (p > fadeThreshold) {
          alpha *= Math.max(0, 1 - (p - fadeThreshold) / 0.35);
        }
      }
      if (alpha <= 0.02) continue;

      // Set font once per ring
      ctx.font = `500 ${scaledFs}px 'IBM Plex Mono', 'Space Mono', monospace`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

      const n = ring.charCount;
      const a0 = angles[k];
      const step = (Math.PI * 2) / n;
      const phraseLen = REPEATED_PHRASE.length;
      const thresholds = ring.thresholds;

      for (let i = 0; i < n; i++) {
        // 1.8s scattered letter reveal check
        if (thresholds[i] > reveal) continue;

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
      // Punch circular hole straight through canvas
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Sharp white glowing boundary stroke
      ctx.beginPath();
      ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 0.75 - (p - 0.32) * 0.8)})`;
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

    const frameStart = performance.now();
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
      const elapsed = (timestamp - loadStartTimeRef.current) / 1800; // 1.8s
      // Ease out cubic
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
    currentProgressRef.current += (targetP - currentProgressRef.current) * 0.16;
    const p = currentProgressRef.current;

    // ── Direct DOM updates (zero React re-renders) ──
    if (heroOverlayRef.current) {
      const heroAlpha = Math.max(0, 1 - p * 3.4);
      heroOverlayRef.current.style.opacity = heroAlpha.toFixed(3);
      heroOverlayRef.current.style.transform = `translateX(${(-p * 35).toFixed(1)}px)`;
      heroOverlayRef.current.style.pointerEvents = heroAlpha > 0.08 ? 'auto' : 'none';
    }

    if (pillRef.current) {
      let pillAlpha = 0;
      if (p < 0.45) {
        pillAlpha = 1;
      } else if (p < 0.65) {
        pillAlpha = Math.max(0, 1 - (p - 0.45) / 0.20);
      }
      pillRef.current.style.opacity = pillAlpha.toFixed(3);
      pillRef.current.style.pointerEvents = pillAlpha > 0.15 ? 'auto' : 'none';
    }

    if (progressRingRef.current) {
      const circumference = 2 * Math.PI * 18;
      const strokeDashoffset = circumference * (1 - p);
      progressRingRef.current.style.strokeDashoffset = strokeDashoffset.toFixed(1);
    }

    if (canvasWrapperRef.current) {
      const canvasAlpha = p > 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1;
      canvasWrapperRef.current.style.opacity = canvasAlpha.toFixed(3);
      canvasWrapperRef.current.style.pointerEvents = p > 0.85 ? 'none' : 'auto';

      // Desktop copy protection mask: only active at initial scroll (p < 0.35)
      if (isDesktopRef.current) {
        if (p < 0.35) {
          canvasWrapperRef.current.style.maskImage = 'linear-gradient(to right, transparent 0%, transparent 38%, #000 62%)';
          canvasWrapperRef.current.style.webkitMaskImage = 'linear-gradient(to right, transparent 0%, transparent 38%, #000 62%)';
        } else {
          canvasWrapperRef.current.style.maskImage = 'none';
          canvasWrapperRef.current.style.webkitMaskImage = 'none';
        }
      } else {
        canvasWrapperRef.current.style.maskImage = 'none';
        canvasWrapperRef.current.style.webkitMaskImage = 'none';
      }
    }

    // Render frame
    renderFrame(canvas, ctx, dpr);

    // Frame watchdog: if frame time > 20ms for 30 consecutive frames, drop DPR to 1
    const frameDuration = performance.now() - frameStart;
    if (frameDuration > 20) {
      slowFrameCountRef.current++;
      if (slowFrameCountRef.current > 30 && dprCapRef.current > 1.0) {
        dprCapRef.current = 1.0;
      }
    } else {
      slowFrameCountRef.current = Math.max(0, slowFrameCountRef.current - 1);
    }

    // Stop drawing entirely once hole covers viewport
    if (p >= 0.98) {
      // Park loop until user scrolls back up
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

    // Check prefers-reduced-motion
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCapRef.current);
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      canvas.width = w;
      canvas.height = h;

      const isDesktop = window.innerWidth >= 768;
      isDesktopRef.current = isDesktop;

      // ── Reference Formulas ──
      // R0 = 0.05 * min(viewportWidth, viewportHeight)
      const viewportMin = Math.min(rect.width, rect.height);
      const R0 = 0.05 * viewportMin * dpr;

      const newRings: RingData[] = [];
      for (let k = 0; k < RING_COUNT; k++) {
        // R(k) = R0 * 1.28^k
        const radius = R0 * Math.pow(1.28, k);
        // fs(R) = 9 + 0.045 * R px
        const cssRadius = radius / dpr;
        const fontSize = (9 + 0.045 * cssRadius) * dpr;
        // n = floor(2 * PI * R / (0.66 * fs))
        const charCount = Math.floor((2 * Math.PI * radius) / (0.66 * fontSize));
        // Alternate rings spin in opposite directions: speed = 0.06 / (1 + 0.12k) rad/s
        const speed = (0.06 / (1 + 0.12 * k)) * (k % 2 === 0 ? 1 : -1);

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

      // Pre-render 22px pitch dot grid with 1px dots at 14% opacity onto offscreen canvas
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.fillStyle = 'rgba(255, 255, 255, 0.14)';
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
      className="relative w-full h-[380vh] bg-[#F7F9FF] select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={stickyContainerRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#F7F9FF]"
      >
        {/* ── UNDERLYING LAYER: Revealed through central aperture ── */}
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
          <TitleScreen onScrollCueClick={handleScrollToHome} />
        </div>

        {/* ── TOP LAYER: Dark Canvas with Concentric Spiral & Aperture ── */}
        <div
          ref={canvasWrapperRef}
          className="absolute inset-0 w-full h-full z-10 transition-opacity duration-300"
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
        >
          {/* Hardware Accelerated Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />

          {/* ── Split Screen Opening Hero Overlay (Desktop: Left, Mobile: Bottom Stack) ── */}
          <div
            ref={heroOverlayRef}
            className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-end md:justify-center pb-16 md:pb-0 pointer-events-none z-20"
          >
            <div className="max-w-xl text-white bg-black/40 md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none shadow-2xl md:shadow-none">
              {/* Overline Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#E7F0FF] mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF] animate-pulse" />
                <span>ENTREPRENEURSHIP CELL · MIT AOE PUNE</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.08] text-white mb-4 sm:mb-6">
                Ideas don&apos;t build <br />
                <span className="text-[#155EEF] italic font-serif">themselves.</span>
              </h1>

              {/* Editorial Subparagraph */}
              <p className="text-xs sm:text-sm lg:text-base font-sans text-slate-300 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                The campus venture engine converting student curiosity into audited startups.
                ₹25L pre-seed grants, rapid prototyping makerspaces, 100% reimbursed patent filings,
                and direct access to Western India&apos;s sharpest builder cohort.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
                <button
                  onClick={handleScrollToHome}
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-[#103B83] text-white px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
                >
                  <span>Explore Ventures</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleScrollToHome}
                  type="button"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Reel</span>
                </button>
              </div>

              {/* Scroll Cue Indicator */}
              <div className="mt-6 sm:mt-10 hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-400">
                <div className="w-2 h-2 rounded-full border border-slate-400 flex items-center justify-center animate-ping" />
                <span>Scroll to dive into ecosystem</span>
              </div>
            </div>
          </div>

          {/* ── Floating Interactive Center Pill ── */}
          <div
            ref={pillRef}
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 z-30 transition-opacity duration-300 pointer-events-auto"
          >
            <div
              className="flex items-center gap-3 bg-black/85 hover:bg-black/95 text-white backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-2xl transition-all cursor-pointer select-none group"
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
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-[#64748B]">
                  OR SCROLL TO DIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
