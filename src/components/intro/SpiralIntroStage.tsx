'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import TitleScreen from './TitleScreen';
import { ArrowDown, Sparkles } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────
 *  SpiralIntroStage — Dense Concentric Entrepreneurship Spiral
 *
 *  Faithfully reproduces the dense layout & interaction of contentarchitecture.dev:
 *  • 22 tightly-spaced concentric text rings filling the entire viewport to the edges
 *  • Curated vocabulary bank dedicated to campus entrepreneurship, pre-seed funding,
 *    and student builder innovation at MIT AOE
 *  • Dynamic font color accents (Electric Blue, Neon Cyan, Crisp White, Muted Slate)
 *  • Interactive cursor hover:
 *    - Matrix character-shift/scramble effect on letters near mouse pointer
 *    - Glow highlight in vibrant Neon Cyan (#38BDF8)
 *    - Micro physical repulsion nudge
 *  • Optical motion trails via subtle phosphor decay
 *  • Crisp white rectangular "CLICK & HOLD" badge matching reference
 *  • Reversible GSAP ScrollTrigger aperture zoom revealing TitleScreen beneath
 * ────────────────────────────────────────────────────────────────────── */

const RING_COUNT = 22;
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
  { text: 'CAMPUS TO VENTURE PLATFORM · HIGH VELOCITY BUILDERS · ', color: 'muted' },
  { text: 'ZERO COMPROMISE ENGINEERING · HARDWARE MAKERSPACES · ', color: 'cyan' },
  { text: 'DEEP CONVICTION CAPITAL · RESEARCH TO COMMERCIAL PRODUCT · ', color: 'blue' },
  { text: 'CAMPUS INCUBATOR · 40+ AUDITED STARTUPS · CIIE ECOSYSTEM · ', color: 'white' },
  { text: 'BUILD THE UNBUILDABLE · AMBITIOUS FOUNDERS · PITCH CLINIC · ', color: 'muted' },
  { text: 'INSTITUTIONAL VENTURE CAPITAL · GLOBAL MENTOR NETWORK · ', color: 'cyan' },
  { text: 'STUDENT VENTURE STUDIO · MIT ACADEMY OF ENGINEERING · ', color: 'white' },
  { text: 'AUDITED PROTOTYPES · RAPID VALIDATION · SEED INVESTMENT · ', color: 'blue' },
  { text: 'IDEAS INTO AUDITED VENTURES · WESTERN INDIA FOUNDERS · ', color: 'muted' },
  { text: 'ENTREPRENEURSHIP CELL · MIT AOE PUNE · BUILD THE FUTURE · ', color: 'cyan' },
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
  const offscreenGridRef = useRef<HTMLCanvasElement | null>(null);

  // UI DOM Refs
  const topNavRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const exploreBtnRef = useRef<HTMLDivElement>(null);

  // Rings dynamic data
  const ringsDataRef = useRef<RingData[]>([]);
  const anglesRef = useRef<Float64Array>(new Float64Array(RING_COUNT));

  // Interactive Cursor Position Ref
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

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
  const renderFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number, timestamp: number) => {
    const w = canvas.width;
    const h = canvas.height;
    const p = currentProgressRef.current;
    const mouse = mousePosRef.current;

    // Rings are dead center in viewport
    const cx = w / 2;
    const cy = h / 2;

    // 1. Motion Trail Pass: Translucent dark background creates smooth phosphor trail decay
    if (p < 0.85) {
      ctx.fillStyle = 'rgba(7, 9, 14, 0.38)';
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = '#07090E';
      ctx.fillRect(0, 0, w, h);
    }

    // 2. Draw cached 22px pitch dot grid
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

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const hoverRadius = 85 * dpr;
    const hoverRadiusSq = hoverRadius * hoverRadius;

    // 5. Draw 22 Concentric Rings
    for (let k = 0; k < rings.length; k++) {
      const ring = rings[k];
      const scaledR = ring.radius * zoomScale;
      const scaledFs = ring.fontSize * Math.pow(zoomScale, 0.60);

      // Cull whole ring if completely inside aperture
      if (holeRadius > 0 && scaledR + scaledFs < holeRadius) {
        continue;
      }

      // Cull if scaled far out of viewport
      if (scaledR - scaledFs > Math.hypot(w, h) / 2 + 120 * dpr) {
        continue;
      }

      // Smooth alpha fade as aperture expands
      let baseAlpha = 0.90;
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

      ctx.font = `500 ${scaledFs}px 'IBM Plex Mono', 'Space Mono', monospace`;

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

        // Aperture culling
        if (holeRadius > 0) {
          const distToCenter = Math.hypot(x - cx, y - cy);
          if (distToCenter < holeRadius + 4 * dpr) continue;
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

            // 1. Character Shift (Scramble glyphs like matrix hacker terminal)
            const scrambleIdx = Math.floor(timestamp * 0.035 + i * 11 + k * 17) % SCRAMBLE_GLYPHS.length;
            charToDraw = SCRAMBLE_GLYPHS[scrambleIdx];

            // 2. High-intensity neon cyan highlight
            charFill = '#38BDF8';

            // 3. Subtle physical micro-nudge away from cursor
            const push = proximity * 6 * dpr;
            const pushAngle = Math.atan2(dy, dx);
            x += Math.cos(pushAngle) * push;
            y += Math.sin(pushAngle) * push;
          }
        }

        // Bullet dots separator highlight
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
      // Punch circular hole straight through canvas to reveal TitleScreen beneath
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

    // 2. Iconic White CLICK & HOLD Badge: fades out as aperture opens
    if (pillRef.current) {
      const pillAlpha = Math.max(0, 1 - p * 3.2);
      pillRef.current.style.opacity = pillAlpha.toFixed(3);
      pillRef.current.style.pointerEvents = pillAlpha > 0.1 ? 'auto' : 'none';
      pillRef.current.style.transform = `translateY(${(p * 25).toFixed(1)}px)`;
    }

    // 3. Explore Button (bottom right)
    if (exploreBtnRef.current) {
      const btnAlpha = Math.max(0, 1 - p * 3.5);
      exploreBtnRef.current.style.opacity = btnAlpha.toFixed(3);
      exploreBtnRef.current.style.pointerEvents = btnAlpha > 0.1 ? 'auto' : 'none';
    }

    // 4. TitleScreen pointer events when aperture fully opens
    if (titleScreenWrapperRef.current) {
      titleScreenWrapperRef.current.style.pointerEvents = p > 0.85 ? 'auto' : 'none';
    }

    // 5. Canvas Wrapper (fades at the very end p > 0.88)
    if (canvasWrapperRef.current) {
      const canvasAlpha = p > 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1;
      canvasWrapperRef.current.style.opacity = canvasAlpha.toFixed(3);
      canvasWrapperRef.current.style.pointerEvents = p > 0.85 ? 'none' : 'auto';
    }

    // Render canvas frame with hover & timestamp for character shift
    renderFrame(canvas, ctx, dpr, timestamp);

    // Stop drawing loop once aperture completely fills viewport
    if (p >= 0.99) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [renderFrame]);

  // ── Setup Canvas, Dot Grid & 22-Ring Mathematical Model ──
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

      // Calculate diagonal to guarantee rings fill the entire screen to the far corners
      const maxDistToCorner = Math.hypot(w, h) / 2;
      const targetOuterRadius = maxDistToCorner * 1.14; // Span slightly beyond viewport corners
      const innerRadius = 26 * dpr;

      // Calibrated growth ratio so 22 rings smoothly pack the space with tight line spacing
      const growthRatio = Math.pow(targetOuterRadius / innerRadius, 1 / (RING_COUNT - 1));

      const newRings: RingData[] = [];
      for (let k = 0; k < RING_COUNT; k++) {
        const radius = innerRadius * Math.pow(growthRatio, k);
        const cssRadius = radius / dpr;

        // Proportional font size to ensure clean radial line spacing without overlaps
        const fontSize = (6.8 + 0.024 * cssRadius) * dpr;

        // Character count: tight monospace density
        const charCount = Math.floor((2 * Math.PI * radius) / (0.69 * fontSize));

        // Speed: smooth alternating angular velocities (inner rings slightly faster, outer rings majestic)
        const speed = (0.044 / (1 + 0.075 * k)) * (k % 2 === 0 ? 1 : -1);

        // Pre-generate random thresholds t in [0, 1] for 1.8s scattered fill-in
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

        {/* ── CANVAS LAYER: Solid dark background with 22 concentric rotating rings & hover ── */}
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

        {/* ── CENTER INTERACTIVE PILL: Iconic White "CLICK & HOLD" Badge (Matching Reference) ── */}
        <div
          ref={pillRef}
          className="absolute bottom-8 sm:bottom-12 inset-x-0 mx-auto w-fit z-30 transition-opacity duration-300 pointer-events-auto select-none"
        >
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            type="button"
            className="bg-white hover:bg-slate-100 active:scale-95 text-black font-mono font-bold text-[10px] sm:text-xs tracking-widest px-4 py-1.5 shadow-2xl uppercase transition-transform cursor-pointer border border-white"
          >
            CLICK &amp; HOLD
          </button>
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
