'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import TitleScreen from './TitleScreen';

/* ────────────────────────────────────────────────────────────────────────
 *  SpiralIntroStage — Signature 4-Stage Opening Experience
 *
 *  Inspired by contentarchitecture.dev:
 *  • Stage 01: Full-screen canvas typography spiral in concentric orbits
 *  • Stage 02: Click & hold / scroll-driven zoom + expanding circular aperture
 *  • Stage 03: Seamless reveal of minimal Title Screen ("MITAOE E-CELL")
 *  • Stage 04: Continuous scroll transition into the homepage
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
  { phrase: 'MITAOE E-CELL · ', radius: 50, fontSize: 10, speed: 0.32, direction: 1, opacity: 0.65, hasGuideOrbit: true },
  { phrase: 'IDEAS INTO IMPACT · ', radius: 95, fontSize: 11, speed: 0.26, direction: -1, opacity: 0.72 },
  { phrase: 'INNOVATION & ENTREPRENEURSHIP · ', radius: 145, fontSize: 12, speed: 0.22, direction: 1, opacity: 0.78, hasGuideOrbit: true },
  { phrase: 'IDEATE · VALIDATE · BUILD · SCALE · ', radius: 200, fontSize: 13, speed: 0.18, direction: -1, opacity: 0.82 },
  { phrase: 'COLLABORATE · EXECUTE · CREATE · ', radius: 260, fontSize: 14, speed: 0.15, direction: 1, opacity: 0.86, hasGuideOrbit: true },
  { phrase: 'CAMPUS TO VENTURE PLATFORM · ', radius: 325, fontSize: 15, speed: 0.12, direction: -1, opacity: 0.90 },
  { phrase: 'STUDENT FOUNDERS ECOSYSTEM · ', radius: 395, fontSize: 16, speed: 0.10, direction: 1, opacity: 0.92, hasGuideOrbit: true },
  { phrase: 'CIIE PUNE · ALANDI CAMPUS · ', radius: 470, fontSize: 17, speed: 0.08, direction: -1, opacity: 0.94 },
  { phrase: 'MIT ACADEMY OF ENGINEERING · ', radius: 550, fontSize: 18, speed: 0.07, direction: 1, opacity: 0.96, hasGuideOrbit: true },
  { phrase: 'THE PLATFORM FOR BUILDERS · ', radius: 635, fontSize: 19, speed: 0.055, direction: -1, opacity: 0.97 },
  { phrase: 'WHERE IDEAS FIND THEIR DIRECTION · ', radius: 725, fontSize: 20, speed: 0.045, direction: 1, opacity: 0.98, hasGuideOrbit: true },
  { phrase: 'ENTREPRENEURSHIP CELL MITAOE · ', radius: 820, fontSize: 21, speed: 0.035, direction: -1, opacity: 0.99 },
];

interface SpiralIntroStageProps {
  onEnterHome?: () => void;
}

export default function SpiralIntroStage({ onEnterHome }: SpiralIntroStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Motion physics variables
  const anglesRef = useRef<number[]>(SPIRAL_RINGS.map((_, i) => i * 0.45));
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isHoldingRef = useRef<boolean>(false);
  const isIntroCompleteRef = useRef<boolean>(false);

  // Mouse cursor pill tracking
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100, active: false });
  const [holdPercent, setHoldPercent] = useState<number>(0);
  const [isIntroDismissed, setIsIntroDismissed] = useState<boolean>(false);

  // Check session storage
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('ecell_intro_seen');
      if (seen === 'true') {
        setIsIntroDismissed(true);
        isIntroCompleteRef.current = true;
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const completeIntro = useCallback(() => {
    if (isIntroCompleteRef.current) return;
    isIntroCompleteRef.current = true;
    try {
      sessionStorage.setItem('ecell_intro_seen', 'true');
    } catch {}
    setIsIntroDismissed(true);
  }, []);

  // ── High Performance Canvas Render Loop ─────────────────────────────
  const renderFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number) => {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // 1. Clear with deep pitch dark tone
    ctx.fillStyle = '#07090E';
    ctx.fillRect(0, 0, w, h);

    // 2. Micro dot blueprint texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    const dotSpacing = 28 * dpr;
    for (let x = 0; x < w; x += dotSpacing) {
      for (let y = 0; y < h; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 0.75 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const p = currentProgressRef.current;

    // 3. Zoom scale: exponential expansion outward
    const zoomScale = 1 + Math.pow(p, 2.3) * 14.0;

    // 4. Render Concentric Typography Rings
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < SPIRAL_RINGS.length; i++) {
      const ring = SPIRAL_RINGS[i];
      const angle = anglesRef.current[i];
      const r = ring.radius * dpr * zoomScale;
      const fontSize = Math.max(8, ring.fontSize * dpr * Math.pow(zoomScale, 0.65));

      // Calculate opacity fade as ring moves out of field of view
      let alpha = ring.opacity;
      if (p > 0.25) {
        const fadeThreshold = 0.25 + (i / SPIRAL_RINGS.length) * 0.45;
        if (p > fadeThreshold) {
          alpha *= Math.max(0, 1 - (p - fadeThreshold) / 0.3);
        }
      }

      if (alpha <= 0.02 || r < 10) continue;

      // Optional delicate dotted guide orbit behind text
      if (ring.hasGuideOrbit && alpha > 0.2) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.14})`;
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([2 * dpr, 6 * dpr]);
        ctx.stroke();
        ctx.restore();
      }

      // Draw repeating characters along circular path
      ctx.save();
      ctx.font = `500 ${fontSize}px 'IBM Plex Mono', 'Space Mono', monospace`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

      // Approximate character angular width
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

        // Only draw if within reasonable bounds around viewport
        if (x < -100 || x > w + 100 || y < -100 || y > h + 100) continue;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(theta + Math.PI / 2);
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }

      ctx.restore();
    }

    // 5. Center aperture hole (Stage 02 Aperture Punch)
    // Punches a circular hole straight through the canvas to reveal TitleScreen beneath!
    if (p > 0.05) {
      const apertureProgress = (p - 0.05) / 0.95;
      const maxRadius = Math.hypot(w, h) / 2 + 80 * dpr;
      const holeRadius = Math.pow(apertureProgress, 1.9) * maxRadius;

      if (holeRadius > 2) {
        // Punch hole
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
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 0.7 - apertureProgress * 0.5)})`;
        ctx.lineWidth = 1.8 * dpr;
        ctx.stroke();
        ctx.restore();
      }
    }

    // 6. Center fallback prompt if not actively interacting
    if (p < 0.25) {
      const promptAlpha = Math.max(0, 1 - p * 4);
      ctx.save();
      ctx.font = `600 ${11 * dpr}px 'IBM Plex Mono', monospace`;
      ctx.fillStyle = `rgba(255, 255, 255, ${promptAlpha * 0.85})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CLICK & HOLD TO ENTER', cx, cy - 8 * dpr);

      ctx.font = `400 ${9.5 * dpr}px 'IBM Plex Mono', monospace`;
      ctx.fillStyle = `rgba(21, 94, 239, ${promptAlpha * 0.9})`;
      ctx.fillText('OR SCROLL TO DIVE IN', cx, cy + 12 * dpr);
      ctx.restore();
    }
  }, []);

  // ── Animation Loop ──────────────────────────────────────────────────
  const animate = useCallback((timestamp: number) => {
    if (isIntroCompleteRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const dt = lastTimeRef.current ? Math.min(0.04, (timestamp - lastTimeRef.current) / 1000) : 0.016;
    lastTimeRef.current = timestamp;

    // Update rotation angles smoothly
    for (let i = 0; i < SPIRAL_RINGS.length; i++) {
      anglesRef.current[i] += SPIRAL_RINGS[i].speed * SPIRAL_RINGS[i].direction * dt;
    }

    // Update hold state
    if (isHoldingRef.current) {
      targetProgressRef.current = Math.min(1.0, targetProgressRef.current + dt * 0.42);
    } else {
      if (targetProgressRef.current < 0.82) {
        targetProgressRef.current = Math.max(0, targetProgressRef.current - dt * 0.65);
      } else {
        // past point of return: smoothly glide to 1.0
        targetProgressRef.current = Math.min(1.0, targetProgressRef.current + dt * 0.8);
      }
    }

    // Smooth lerp easing
    currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.12;

    const currentP = currentProgressRef.current;
    setHoldPercent(Math.round(currentP * 100));

    // When progress reaches 99%, complete intro
    if (currentP >= 0.985) {
      completeIntro();
      return;
    }

    // Render frame
    renderFrame(canvas, ctx, dpr);

    rafRef.current = requestAnimationFrame(animate);
  }, [renderFrame, completeIntro]);

  // ── Setup Canvas & Resize Listener ──────────────────────────────────
  useEffect(() => {
    if (isIntroDismissed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isIntroDismissed, animate]);

  // ── Mousewheel / Scroll Listener for Dive ───────────────────────────
  useEffect(() => {
    if (isIntroDismissed) return;

    const handleWheel = (e: WheelEvent) => {
      if (isIntroCompleteRef.current) return;
      if (e.deltaY > 0) {
        // scrolling down advances the dive
        targetProgressRef.current = Math.min(1.0, targetProgressRef.current + Math.abs(e.deltaY) * 0.0022);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isIntroDismissed]);

  // ── Pointer Handlers (Click & Hold) ─────────────────────────────────
  const handlePointerDown = () => {
    isHoldingRef.current = true;
  };

  const handlePointerUp = () => {
    isHoldingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY, active: true });
  };

  const handlePointerLeave = () => {
    isHoldingRef.current = false;
    setCursorPos((prev) => ({ ...prev, active: false }));
  };

  // ── Keyboard accessibility (Spacebar) ───────────────────────────────
  useEffect(() => {
    if (isIntroDismissed) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        isHoldingRef.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isHoldingRef.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isIntroDismissed]);

  // ── Smooth scroll down to main website ──────────────────────────────
  const handleScrollToHome = () => {
    const el = document.getElementById('homepage-main');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onEnterHome) onEnterHome();
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* ── STAGE 03: Title Screen (Underneath Canvas) ── */}
      <TitleScreen onScrollCueClick={handleScrollToHome} />

      {/* ── STAGE 01 & 02: Canvas Spiral Layer (On top, punched with aperture) ── */}
      {!isIntroDismissed && (
        <div
          className="fixed inset-0 z-50 overflow-hidden bg-[#07090E] select-none"
          style={{
            pointerEvents: holdPercent > 98 ? 'none' : 'auto',
            touchAction: 'none',
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          />

          {/* Floating Pill Cursor (Identical to contentarchitecture.dev) */}
          {cursorPos.active && (
            <div
              className="pointer-events-none fixed z-50 transform -translate-x-1/2 -translate-y-12 transition-transform duration-75 select-none"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
              }}
            >
              <div className="px-3.5 py-1.5 rounded-full bg-white text-[#07090E] font-mono text-[11px] uppercase tracking-wider font-semibold shadow-2xl flex items-center gap-2 border border-white/20">
                <span className={`w-1.5 h-1.5 rounded-full ${isHoldingRef.current ? 'bg-[#155EEF] animate-ping' : 'bg-[#155EEF]'}`} />
                <span>{isHoldingRef.current ? `DIVING ${holdPercent}%` : 'CLICK & HOLD'}</span>
              </div>
            </div>
          )}

          {/* Top Left Brand Pill */}
          <div className="absolute top-6 left-6 z-40 flex items-center gap-3 pointer-events-none">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center font-mono font-bold text-xs text-white">
              EC
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
              MITAOE E-CELL // PLAYGROUND
            </span>
          </div>

          {/* Top Right Skip Button */}
          <button
            onClick={completeIntro}
            type="button"
            className="absolute top-6 right-6 z-50 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* Bottom Progress Bar */}
          {holdPercent > 3 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-48 sm:w-64">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#155EEF] transition-all duration-75"
                  style={{ width: `${holdPercent}%` }}
                />
              </div>
              <div className="text-center font-mono text-[10px] text-white/40 uppercase tracking-widest mt-2">
                Aperture: {holdPercent}%
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

