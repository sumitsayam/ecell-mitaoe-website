'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import TitleScreen from './TitleScreen';
import { ArrowDown, ArrowUpRight, Play, Sparkles } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────
 *  SpiralIntroStage — Reversible Scroll-Controlled Opening Experience
 *
 *  Inspired by contentarchitecture.dev:
 *  • Stage 01: Split opening hero (Editorial copy left, 2D Canvas spiral right)
 *  • Stage 02: Pinned scroll progress glides spiral to center & expands rings
 *  • Stage 03: Expanding circular aperture reveals underlying architectural plate
 *  • Stage 04: Continuous scroll transition into the homepage
 *  • 100% REVERSIBLE: Scrolling back up scrubs the timeline in reverse!
 *  • ZERO React state updates inside requestAnimationFrame (60-120fps smooth)
 *  • Offscreen canvas cached dot grid + context ref caching
 * ────────────────────────────────────────────────────────────────────── */

interface RingDefinition {
  phrase: string;
  radius: number;        // base radius in CSS px
  fontSize: number;      // base font size in px
  speed: number;         // radians per second
  direction: 1 | -1;     // 1 = clockwise, -1 = counter-clockwise
  opacity: number;
  hasGuideOrbit?: boolean;
}

const SPIRAL_RINGS: RingDefinition[] = [
  { phrase: 'MITAOE E-CELL · ', radius: 52, fontSize: 10, speed: 0.32, direction: 1, opacity: 0.70, hasGuideOrbit: true },
  { phrase: 'IDEAS INTO IMPACT · ', radius: 98, fontSize: 11, speed: 0.26, direction: -1, opacity: 0.75 },
  { phrase: 'INNOVATION & ENTREPRENEURSHIP · ', radius: 148, fontSize: 12, speed: 0.22, direction: 1, opacity: 0.80, hasGuideOrbit: true },
  { phrase: 'IDEATE · VALIDATE · BUILD · SCALE · ', radius: 205, fontSize: 13, speed: 0.18, direction: -1, opacity: 0.84 },
  { phrase: 'COLLABORATE · EXECUTE · CREATE · ', radius: 268, fontSize: 14, speed: 0.15, direction: 1, opacity: 0.88, hasGuideOrbit: true },
  { phrase: 'CAMPUS TO VENTURE PLATFORM · ', radius: 335, fontSize: 15, speed: 0.12, direction: -1, opacity: 0.91 },
  { phrase: 'STUDENT FOUNDERS ECOSYSTEM · ', radius: 405, fontSize: 16, speed: 0.10, direction: 1, opacity: 0.93, hasGuideOrbit: true },
  { phrase: 'CIIE PUNE · ALANDI CAMPUS · ', radius: 480, fontSize: 17, speed: 0.08, direction: -1, opacity: 0.95 },
  { phrase: 'MIT ACADEMY OF ENGINEERING · ', radius: 560, fontSize: 18, speed: 0.07, direction: 1, opacity: 0.96, hasGuideOrbit: true },
  { phrase: 'THE PLATFORM FOR BUILDERS · ', radius: 645, fontSize: 19, speed: 0.055, direction: -1, opacity: 0.97 },
  { phrase: 'WHERE IDEAS FIND THEIR DIRECTION · ', radius: 735, fontSize: 20, speed: 0.045, direction: 1, opacity: 0.98, hasGuideOrbit: true },
  { phrase: 'ENTREPRENEURSHIP CELL MITAOE · ', radius: 830, fontSize: 21, speed: 0.035, direction: -1, opacity: 0.99 },
];

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

  // DOM Refs for zero-react-render UI updates
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const progressRingRef = useRef<SVGCircleElement>(null);

  // Animation & Timeline physics
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const anglesRef = useRef<number[]>(SPIRAL_RINGS.map((_, i) => i * 0.42));
  const scrollProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isHoldingRef = useRef<boolean>(false);
  const isDesktopRef = useRef<boolean>(false);

  // ── Scroll to next stage helper ──
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

  // ── Frame Rendering (Optimized for 60-120fps) ──
  const renderFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number) => {
    const w = canvas.width;
    const h = canvas.height;

    const p = currentProgressRef.current;
    const isDesktop = isDesktopRef.current;

    // Smooth horizontal glide: on desktop, start offset to right (0.68) and center (0.5) by p=0.35
    const centerShiftProgress = Math.min(1, p / 0.35);
    const cx = isDesktop ? (w * (0.68 - 0.18 * centerShiftProgress)) : (w / 2);
    const cy = h / 2;

    // 1. Clear background
    ctx.fillStyle = '#07090E';
    ctx.fillRect(0, 0, w, h);

    // 2. Draw cached offscreen dot grid (single blit call!)
    if (offscreenGridRef.current) {
      ctx.drawImage(offscreenGridRef.current, 0, 0);
    }

    // 3. Zoom scale: smooth exponential ring expansion
    const zoomScale = 1 + Math.pow(p, 2.2) * 12.0;

    // 4. Render Concentric Typography Rings
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < SPIRAL_RINGS.length; i++) {
      const ring = SPIRAL_RINGS[i];
      const angle = anglesRef.current[i];
      const r = ring.radius * dpr * zoomScale;
      const fontSize = Math.max(8, ring.fontSize * dpr * Math.pow(zoomScale, 0.62));

      // Calculate opacity fade as ring zooms out of field of view
      let alpha = ring.opacity;
      if (p > 0.20) {
        const fadeThreshold = 0.20 + (i / SPIRAL_RINGS.length) * 0.45;
        if (p > fadeThreshold) {
          alpha *= Math.max(0, 1 - (p - fadeThreshold) / 0.35);
        }
      }

      if (alpha <= 0.02 || r < 8) continue;

      // Subtle guide orbit behind text
      if (ring.hasGuideOrbit && alpha > 0.18) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.12})`;
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([2 * dpr, 6 * dpr]);
        ctx.stroke();
        ctx.restore();
      }

      // Draw repeating characters along circular path
      ctx.save();
      ctx.font = `500 ${fontSize}px 'IBM Plex Mono', 'Space Mono', monospace`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

      const charWidthEstimate = fontSize * 0.62;
      const charAngularStep = charWidthEstimate / r;
      const totalChars = Math.floor((Math.PI * 2) / charAngularStep);

      const phrase = ring.phrase;
      let charIdx = 0;

      for (let k = 0; k < totalChars; k++) {
        const theta = angle + k * charAngularStep;
        const char = phrase[charIdx % phrase.length];
        charIdx++;

        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r;

        // Viewport frustum culling
        if (x < -80 || x > w + 80 || y < -80 || y > h + 80) continue;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(theta + Math.PI / 2);
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }

      ctx.restore();
    }

    // 5. Stage 03 Circular Aperture Punch (Reveals underlying TitleScreen/Ledger)
    if (p > 0.32) {
      const apertureProgress = (p - 0.32) / 0.58; // 0.0 to 1.0
      const maxRadius = Math.hypot(w, h) / 2 + 100 * dpr;
      const holeRadius = Math.pow(apertureProgress, 2.1) * maxRadius;

      if (holeRadius > 1.5) {
        // Cut circular hole straight through canvas
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Crisp white boundary stroke
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 0.7 - apertureProgress * 0.6)})`;
        ctx.lineWidth = 1.8 * dpr;
        ctx.stroke();
        ctx.restore();
      }
    }
  }, []);

  // ── Animation Loop (RAF) ──
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dt = lastTimeRef.current ? Math.min(0.04, (timestamp - lastTimeRef.current) / 1000) : 0.016;
    lastTimeRef.current = timestamp;

    // Update ring angles
    for (let i = 0; i < SPIRAL_RINGS.length; i++) {
      anglesRef.current[i] += SPIRAL_RINGS[i].speed * SPIRAL_RINGS[i].direction * dt;
    }

    // If holding down, smoothly scroll the window forward
    if (isHoldingRef.current) {
      const scrollSpeed = 16 * (1 + currentProgressRef.current * 1.8);
      window.scrollBy({ top: scrollSpeed, behavior: 'auto' });
    }

    // Smooth lerp progress towards actual ScrollTrigger progress
    const targetP = scrollProgressRef.current;
    currentProgressRef.current += (targetP - currentProgressRef.current) * 0.16;

    const p = currentProgressRef.current;

    // ── Direct DOM updates for UI elements (zero React re-renders) ──
    if (heroOverlayRef.current) {
      const heroAlpha = Math.max(0, 1 - p * 3.8);
      heroOverlayRef.current.style.opacity = heroAlpha.toFixed(3);
      heroOverlayRef.current.style.transform = `translateX(${(-p * 40).toFixed(1)}px)`;
      heroOverlayRef.current.style.pointerEvents = heroAlpha > 0.1 ? 'auto' : 'none';
    }

    if (pillRef.current) {
      // Pill is prominent between p = 0.15 and p = 0.55
      let pillAlpha = 0;
      if (p < 0.15) {
        pillAlpha = 1;
      } else if (p <= 0.45) {
        pillAlpha = 1;
      } else if (p < 0.65) {
        pillAlpha = Math.max(0, 1 - (p - 0.45) / 0.20);
      }
      pillRef.current.style.opacity = pillAlpha.toFixed(3);
      pillRef.current.style.pointerEvents = pillAlpha > 0.2 ? 'auto' : 'none';
    }

    if (progressRingRef.current) {
      const circumference = 2 * Math.PI * 18;
      const strokeDashoffset = circumference * (1 - p);
      progressRingRef.current.style.strokeDashoffset = strokeDashoffset.toFixed(1);
    }

    if (canvasWrapperRef.current) {
      // Fade canvas to 0 when aperture completely envelopes viewport
      const canvasAlpha = p > 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1;
      canvasWrapperRef.current.style.opacity = canvasAlpha.toFixed(3);
      canvasWrapperRef.current.style.pointerEvents = p > 0.85 ? 'none' : 'auto';
    }

    // Render Canvas Frame
    renderFrame(canvas, ctx, dpr);

    rafRef.current = requestAnimationFrame(animate);
  }, [renderFrame]);

  // ── Setup Canvas, Dot Grid & GSAP ScrollTrigger ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cache 2D context
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      canvas.width = w;
      canvas.height = h;

      isDesktopRef.current = window.innerWidth >= 1024;

      // Pre-render static micro dot grid onto offscreen canvas
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        const dotSpacing = 28 * dpr;
        for (let x = 0; x < w; x += dotSpacing) {
          for (let y = 0; y < h; y += dotSpacing) {
            offCtx.beginPath();
            offCtx.arc(x, y, 0.75 * dpr, 0, Math.PI * 2);
            offCtx.fill();
          }
        }
      }
      offscreenGridRef.current = offscreen;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic import GSAP and ScrollTrigger for SSR safety
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
        console.error('Failed to initialize ScrollTrigger:', err);
      }
    })();

    // Start RAF
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, [animate]);

  // ── Holding Interaction Handlers ──
  const startHold = () => {
    isHoldingRef.current = true;
  };

  const endHold = () => {
    isHoldingRef.current = false;
  };

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
          className="absolute inset-0 w-full h-full z-10"
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

          {/* ── Split Screen Opening Hero Overlay (p = 0 to 0.3) ── */}
          <div
            ref={heroOverlayRef}
            className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center pointer-events-none z-20"
          >
            <div className="max-w-xl text-white">
              {/* Overline Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#E7F0FF] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF] animate-pulse" />
                <span>ENTREPRENEURSHIP CELL · MIT AOE PUNE</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.08] text-white mb-6">
                Ideas don&apos;t build <br />
                <span className="text-[#155EEF] italic font-serif">themselves.</span>
              </h1>

              {/* Editorial Subparagraph */}
              <p className="text-sm sm:text-base font-sans text-slate-300 leading-relaxed mb-8">
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
              <div className="mt-12 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-400">
                <div className="w-2 h-2 rounded-full border border-slate-400 flex items-center justify-center animate-ping" />
                <span>Scroll to dive into ecosystem</span>
              </div>
            </div>
          </div>

          {/* ── Floating Interactive Center Pill ── */}
          <div
            ref={pillRef}
            className="absolute bottom-10 right-6 sm:right-12 z-30 transition-opacity duration-300 pointer-events-auto"
          >
            <div
              className="flex items-center gap-3 bg-black/80 hover:bg-black/95 text-white backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-full shadow-2xl transition-all cursor-pointer select-none group"
              onMouseDown={startHold}
              onMouseUp={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
            >
              {/* Circular SVG Progress Ring */}
              <div className="relative w-7 h-7 flex items-center justify-center">
                <svg className="w-7 h-7 -rotate-90" viewBox="0 0 40 40">
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
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-white">
                  CLICK &amp; HOLD
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#64748B]">
                  OR SCROLL TO ENTER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
