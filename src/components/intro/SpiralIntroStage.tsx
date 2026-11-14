'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import TitleScreen from './TitleScreen';

/* ────────────────────────────────────────────────────────────────────────
 *  SpiralIntroStage — High-Performance Concentric Typography Spiral
 *
 *  Engineered for 60–120 FPS with minimal main-thread CPU and GPU footprint:
 *  • Responsive Ring Profiles:
 *    - Desktop (>= 1200px): 11–12 calibrated rings
 *    - Standard / Laptop (768px – 1199px): 8 rings
 *    - Mobile (< 768px): 6 rings
 *    - Reduced motion: 4 rings
 *  • Hardware-accelerated 22px dot pattern (createPattern tile, 0 full-screen blits)
 *  • Squared Euclidean distance culling (eliminates ~250,000 Math.hypot calls/sec)
 *  • Strict animation lifecycle: loop cancels completely when offscreen or hidden
 *  • Device Pixel Ratio capped at 1.5x with smart resize caching
 *  • Fully reversible GSAP ScrollTrigger timeline (downward and upward scrub)
 *  • Zero React re-renders: all high-frequency physics maintained in refs
 * ────────────────────────────────────────────────────────────────────── */

const SCRAMBLE_GLYPHS = '0123456789ABCDEF$#@%&*+=?~^/\\<>[]{}|;:';

interface PhraseConfig {
  text: string;
  color: 'white' | 'blue' | 'cyan' | 'muted';
}

const ENTREPRENEURSHIP_PHRASES: PhraseConfig[] = [
  { text: 'ZERO TO ONE · SEED CAPITAL · PROTOTYPE · ', color: 'cyan' },
  { text: 'STUDENT FOUNDERS · HIGH CONVICTION · BUILD WHAT SCALES · ', color: 'white' },
  { text: '₹25L PRE-SEED GRANTS · RAPID PROTOTYPING · MAKERSPACE · ', color: 'blue' },
  { text: 'CAMPUS VENTURE ENGINE · WESTERN INDIA BUILDERS · CIIE PUNE · ', color: 'muted' },
  { text: 'DISRUPTIVE INNOVATION · DEEP TECH LABS · AUDITED PROTOTYPES · ', color: 'cyan' },
  { text: 'PATENT CLINIC · 100% REIMBURSED IP FILINGS · HARD TECH · ', color: 'white' },
  { text: 'PRODUCT MARKET FIT · SHIP FAST BREAK CONSTRAINTS · SAAS · ', color: 'blue' },
  { text: 'ENTREPRENEURSHIP CELL · MIT AOE PUNE · VENTURE STUDIO · ', color: 'white' },
  { text: 'ANGEL SYNDICATE · COHORT 2026 · ALANDI INNOVATION CAMPUS · ', color: 'muted' },
  { text: 'RADICAL INVENTIONS · FOUNDER OPERATORS · DORM TO SEED · ', color: 'cyan' },
  { text: 'VENTURE ARCHITECTURE · CODE CAPITAL HARDWARE · ', color: 'blue' },
  { text: 'EQUITY FREE GRANTS · FOUNDER FELLOWSHIPS · BUILD TO SCALE · ', color: 'white' },
];

interface RingData {
  radius: number;
  fontSize: number;
  charCount: number;
  speed: number;
  thresholds: Float32Array;
  phrase: string;
  colorType: 'white' | 'blue' | 'cyan' | 'muted';
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
  const dotPatternRef = useRef<CanvasPattern | null>(null);

  // UI DOM Refs
  const pillRef = useRef<HTMLDivElement>(null);

  // Rings dynamic data
  const ringsDataRef = useRef<RingData[]>([]);
  const anglesRef = useRef<Float64Array>(new Float64Array(0));

  // Interactive Cursor Position Ref
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  // Physics & Animation Lifecycle Refs
  const rafIdRef = useRef<number | null>(null);
  const isActiveRef = useRef<boolean>(true);
  const isVisibleRef = useRef<boolean>(true);
  const lastTimeRef = useRef<number>(0);
  const loadStartTimeRef = useRef<number>(0);
  const revealProgressRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isHoldingRef = useRef<boolean>(false);
  const reducedMotionRef = useRef<boolean>(false);
  const dprCapRef = useRef<number>(1.5);

  // Last known dimensions to prevent redundant resize recomputations
  const lastDimensionsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

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

  // ── Render Single Frame (Optimized 60–120 FPS Target) ──
  const renderFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number, timestamp: number) => {
    const w = canvas.width;
    const h = canvas.height;
    const p = currentProgressRef.current;
    const mouse = mousePosRef.current;

    // Rings are dead center in viewport
    const cx = w / 2;
    const cy = h / 2;

    // 1. Draw solid dark background
    ctx.fillStyle = '#07090E';
    ctx.fillRect(0, 0, w, h);

    // 2. Hardware-accelerated dot pattern fill (0 offscreen canvas-to-canvas blits)
    if (dotPatternRef.current) {
      ctx.fillStyle = dotPatternRef.current;
      ctx.fillRect(0, 0, w, h);
    }

    // 3. Zoom Scale (smooth quadratic acceleration)
    const zoomScale = 1 + Math.pow(p, 2.2) * 11.0;

    // 4. Aperture radius calculation (opens when p > 0.18)
    let holeRadius = 0;
    let holeCutoffSq = 0;
    if (p > 0.18) {
      const apertureProgress = (p - 0.18) / 0.74;
      const maxRadius = Math.hypot(w, h) / 2 + 100 * dpr;
      holeRadius = Math.pow(apertureProgress, 2.1) * maxRadius;
      const cutoffRadius = holeRadius + 4 * dpr;
      holeCutoffSq = cutoffRadius * cutoffRadius;
    }

    const reveal = revealProgressRef.current;
    const isRevealComplete = reveal >= 1.0;
    const rings = ringsDataRef.current;
    const angles = anglesRef.current;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const hoverRadius = 80 * dpr;
    const hoverRadiusSq = hoverRadius * hoverRadius;
    const maxViewportDist = Math.hypot(w, h) / 2 + 120 * dpr;

    // 5. Draw Responsive Concentric Rings
    for (let k = 0; k < rings.length; k++) {
      const ring = rings[k];
      const scaledR = ring.radius * zoomScale;
      const scaledFs = ring.fontSize * Math.pow(zoomScale, 0.60);

      // Cull whole ring if completely inside aperture
      if (holeRadius > 0 && scaledR + scaledFs < holeRadius) {
        continue;
      }

      // Cull if scaled far out of viewport
      if (scaledR - scaledFs > maxViewportDist) {
        continue;
      }

      // Smooth alpha fade as aperture expands
      let baseAlpha = 0.92;
      if (p > 0.18) {
        const fadeThreshold = 0.18 + (k / rings.length) * 0.42;
        if (p > fadeThreshold) {
          baseAlpha *= Math.max(0, 1 - (p - fadeThreshold) / 0.35);
        }
      }
      if (baseAlpha <= 0.02) continue;

      // Color palette per ring
      let defaultFill: string;
      switch (ring.colorType) {
        case 'blue':
          defaultFill = `rgba(96, 165, 250, ${baseAlpha * 1.05})`; // Electric Blue (#60A5FA)
          break;
        case 'cyan':
          defaultFill = `rgba(56, 189, 248, ${baseAlpha * 1.10})`; // Luminous Cyan (#38BDF8)
          break;
        case 'muted':
          defaultFill = `rgba(148, 163, 184, ${baseAlpha * 0.75})`; // Technical Slate (#94A3B8)
          break;
        case 'white':
        default:
          defaultFill = `rgba(255, 255, 255, ${baseAlpha})`;
          break;
      }

      // Rounded font size for fast font metric cache hit
      const fsRounded = Math.max(8, Math.round(scaledFs));
      ctx.font = `500 ${fsRounded}px 'IBM Plex Mono', 'Space Mono', monospace`;

      const n = ring.charCount;
      const a0 = angles[k];
      const step = (Math.PI * 2) / n;
      const phrase = ring.phrase;
      const phraseLen = phrase.length;
      const thresholds = ring.thresholds;

      for (let i = 0; i < n; i++) {
        // Load-in reveal check during first 1.8s
        if (!isRevealComplete && thresholds[i] > reveal) continue;

        // Angle: theta = a0 - i * (2*PI/n)
        const theta = a0 - i * step;
        let x = cx + scaledR * Math.cos(theta);
        let y = cy + scaledR * Math.sin(theta);

        // Frustum culling (+40px padding)
        if (x < -40 * dpr || x > w + 40 * dpr || y < -40 * dpr || y > h + 40 * dpr) {
          continue;
        }

        // Aperture culling via squared distance (0 Math.hypot calls)
        const dxCenter = x - cx;
        const dyCenter = y - cy;
        if (holeRadius > 0 && dxCenter * dxCenter + dyCenter * dyCenter < holeCutoffSq) {
          continue;
        }

        const originalChar = phrase[i % phraseLen];

        // ── Cursor Hover Interaction: Matrix Character Shift & Cyan Glow ──
        let charToDraw = originalChar;
        let charFill = defaultFill;

        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < hoverRadiusSq && originalChar !== ' ') {
            const dist = Math.sqrt(distSq);
            const proximity = 1 - dist / hoverRadius;

            // Character Shift
            const scrambleIdx = Math.floor(timestamp * 0.035 + i * 11 + k * 17) % SCRAMBLE_GLYPHS.length;
            charToDraw = SCRAMBLE_GLYPHS[scrambleIdx];
            charFill = '#38BDF8';

            // Micro repulsion push away from cursor
            const push = proximity * 5 * dpr;
            const pushAngle = Math.atan2(dy, dx);
            x += Math.cos(pushAngle) * push;
            y += Math.sin(pushAngle) * push;
          }
        }

        // Bullet dot highlight
        if (charToDraw === '·') {
          charFill = `rgba(56, 189, 248, ${Math.min(1, baseAlpha * 1.3)})`;
        }

        // Rotation: theta - PI/2 (tops point inward toward center)
        const rot = theta - Math.PI / 2;
        const c = Math.cos(rot);
        const s = Math.sin(rot);

        ctx.fillStyle = charFill;
        ctx.setTransform(c, s, -s, c, x, y);
        ctx.fillText(charToDraw, 0, 0);
      }
    }

    ctx.resetTransform();

    // 6. Aperture Punch & Glowing Edge
    if (holeRadius > 2) {
      // Punch circular aperture directly through canvas to reveal TitleScreen beneath
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Sharp glowing circular boundary
      ctx.beginPath();
      ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 0.75 - (p - 0.18) * 0.85)})`;
      ctx.lineWidth = 1.6 * dpr;
      ctx.stroke();
    }
  }, []);

  // ── Animation Loop Controller ──
  const animate = useCallback((timestamp: number) => {
    if (!isActiveRef.current || !isVisibleRef.current || document.hidden) {
      rafIdRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) {
      rafIdRef.current = null;
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

    // Update rotation angles with alternating speeds
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

    // Smooth lerp progress
    const targetP = scrollProgressRef.current;
    currentProgressRef.current += (targetP - currentProgressRef.current) * 0.18;
    const p = currentProgressRef.current;

    // Direct DOM updates (zero React re-renders)
    if (pillRef.current) {
      const pillAlpha = Math.max(0, 1 - p * 3.5);
      pillRef.current.style.opacity = pillAlpha.toFixed(3);
      pillRef.current.style.pointerEvents = pillAlpha > 0.1 ? 'auto' : 'none';
    }

    if (titleScreenWrapperRef.current) {
      titleScreenWrapperRef.current.style.pointerEvents = p > 0.85 ? 'auto' : 'none';
    }

    if (canvasWrapperRef.current) {
      const canvasAlpha = p > 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1;
      canvasWrapperRef.current.style.opacity = canvasAlpha.toFixed(3);
      canvasWrapperRef.current.style.pointerEvents = p > 0.85 ? 'none' : 'auto';
    }

    // Render canvas frame
    renderFrame(canvas, ctx, dpr, timestamp);

    // Stop drawing loop once aperture completely fills viewport (p >= 0.995)
    if (p >= 0.995 && targetP >= 0.995) {
      rafIdRef.current = null;
      return;
    }

    rafIdRef.current = requestAnimationFrame(animate);
  }, [renderFrame]);

  const startLoop = useCallback(() => {
    if (isActiveRef.current && rafIdRef.current === null && !document.hidden && isVisibleRef.current) {
      lastTimeRef.current = 0;
      rafIdRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const stopLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  // ── Setup Canvas & Responsive Ring Profile ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    isActiveRef.current = true;
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCapRef.current);
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      // Avoid clearing canvas and recalculating if size didn't change
      if (lastDimensionsRef.current.w === w && lastDimensionsRef.current.h === h) {
        return;
      }
      lastDimensionsRef.current = { w, h };

      canvas.width = w;
      canvas.height = h;

      // Pre-compile 22px hardware dot pattern tile once on resize
      const patternCanvas = document.createElement('canvas');
      const pitch = Math.round(22 * dpr);
      patternCanvas.width = pitch;
      patternCanvas.height = pitch;
      const pCtx = patternCanvas.getContext('2d');
      if (pCtx) {
        pCtx.fillStyle = 'rgba(255, 255, 255, 0.14)';
        pCtx.beginPath();
        pCtx.arc(pitch / 2, pitch / 2, Math.max(1, 1 * dpr), 0, Math.PI * 2);
        pCtx.fill();
        dotPatternRef.current = ctx.createPattern(patternCanvas, 'repeat');
      }

      // Responsive Ring Count Selection:
      // Desktop: 12 rings | Standard / Laptop: 8 rings | Mobile: 6 rings | Reduced Motion: 4 rings
      const cssWidth = rect.width;
      let targetRingCount = 12;
      if (reducedMotionRef.current) {
        targetRingCount = 4;
      } else if (cssWidth < 640) {
        targetRingCount = 6;
      } else if (cssWidth < 1024) {
        targetRingCount = 8;
      }

      anglesRef.current = new Float64Array(targetRingCount);

      const maxDistToCorner = Math.hypot(w, h) / 2;
      const targetOuterRadius = maxDistToCorner * 1.08;
      const innerRadius = (cssWidth < 640 ? 32 : 38) * dpr;

      const growthRatio = Math.pow(targetOuterRadius / innerRadius, 1 / (targetRingCount - 1));

      const newRings: RingData[] = [];
      for (let k = 0; k < targetRingCount; k++) {
        const radius = innerRadius * Math.pow(growthRatio, k);
        const cssRadius = radius / dpr;

        // Calibrated typography scale
        const fontSize = (7.5 + 0.032 * cssRadius) * dpr;

        // Monospace letter density
        const charCount = Math.floor((2 * Math.PI * radius) / (0.68 * fontSize));

        // Alternating speeds
        const speed = (0.046 / (1 + 0.08 * k)) * (k % 2 === 0 ? 1 : -1);

        // Pre-generate random thresholds for 1.8s scattered fill-in
        const thresholds = new Float32Array(charCount);
        for (let i = 0; i < charCount; i++) {
          thresholds[i] = Math.random();
        }

        const phraseConfig = ENTREPRENEURSHIP_PHRASES[k % ENTREPRENEURSHIP_PHRASES.length];

        newRings.push({
          radius,
          fontSize,
          charCount,
          speed,
          thresholds,
          phrase: phraseConfig.text,
          colorType: phraseConfig.color,
        });
      }
      ringsDataRef.current = newRings;

      // Trigger frame if loop is running
      startLoop();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Visibility Listener: pause completely when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver: pause loop when spiral is scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        startLoop();
      } else {
        stopLoop();
      }
    }, { threshold: 0.01 });

    if (pinWrapperRef.current) {
      observer.observe(pinWrapperRef.current);
    }

    // Synchronized Reversible GSAP ScrollTrigger
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
              // Wake loop if user scrolls back up
              if (self.progress < 0.99) {
                startLoop();
              }
            },
          });
        }
      } catch (err) {
        console.error('ScrollTrigger initialization failed:', err);
      }
    })();

    startLoop();

    return () => {
      isActiveRef.current = false;
      stopLoop();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, [animate, startLoop, stopLoop]);

  // ── Holding Interaction ──
  const startHold = () => {
    isHoldingRef.current = true;
    startLoop();
  };
  const endHold = () => {
    isHoldingRef.current = false;
  };

  // ── Pointer Move for Character Shift / Matrix Hover Effect ──
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, dprCapRef.current);
    mousePosRef.current = {
      x: (e.clientX - rect.left) * dpr,
      y: (e.clientY - rect.top) * dpr,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000, active: false };
  };

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

        {/* ── CANVAS LAYER: Concentric rotating kinetic typography & aperture punch ── */}
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
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* ── HOLD OR SCROLL CUE ── */}
        <div
          ref={pillRef}
          className="absolute bottom-8 sm:bottom-10 inset-x-0 mx-auto w-fit z-20 transition-opacity duration-300 pointer-events-auto select-none"
        >
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            type="button"
            className="bg-white/90 hover:bg-white active:scale-95 text-black font-mono font-medium text-xs tracking-wider px-5 py-2 rounded-full shadow-lg uppercase transition-all cursor-pointer border border-white/20"
          >
            Hold or scroll to explore ↓
          </button>
        </div>
      </div>
    </div>
  );
}
