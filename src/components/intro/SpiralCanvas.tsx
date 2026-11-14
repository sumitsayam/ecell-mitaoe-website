'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
 *  SpiralCanvas — Full-viewport <canvas> concentric text spiral
 *
 *  Inspired by contentarchitecture.dev.
 *  • Multiple concentric rings of repeating text
 *  • Each ring rotates at its own speed, alternating direction
 *  • Scroll-driven zoom via GSAP ScrollTrigger (pinned)
 *  • Click-and-hold expands a radial mask to reveal content beneath
 *  • requestAnimationFrame for buttery 60 fps
 *  • Dark (#0A0A0A) background with subtle dot grid
 *  • Lenis smooth-scroll integration
 * ────────────────────────────────────────────────────────────────────── */

// ── Ring config ──────────────────────────────────────────────────────
interface RingConfig {
  text: string;
  radius: number;        // base radius in CSS px (scaled for DPR later)
  fontSize: number;      // in px
  speed: number;         // radians per second
  direction: 1 | -1;     // 1 = clockwise, -1 = counter-clockwise
  opacity: number;
  letterSpacing: number; // extra px between chars
}

const RINGS: RingConfig[] = [
  { text: 'MITAOE E-CELL',              radius: 60,   fontSize: 11,  speed: 0.25,  direction: 1,  opacity: 0.65, letterSpacing: 6 },
  { text: 'ENTREPRENEURSHIP',           radius: 110,  fontSize: 12,  speed: 0.20,  direction: -1, opacity: 0.72, letterSpacing: 5 },
  { text: 'INNOVATION',                 radius: 160,  fontSize: 13,  speed: 0.18,  direction: 1,  opacity: 0.78, letterSpacing: 4 },
  { text: 'IDEATE',                     radius: 210,  fontSize: 14,  speed: 0.15,  direction: -1, opacity: 0.82, letterSpacing: 4 },
  { text: 'BUILD',                      radius: 260,  fontSize: 15,  speed: 0.12,  direction: 1,  opacity: 0.85, letterSpacing: 3 },
  { text: 'COLLABORATE',                radius: 320,  fontSize: 16,  speed: 0.10,  direction: -1, opacity: 0.88, letterSpacing: 3 },
  { text: 'EXECUTE',                    radius: 380,  fontSize: 17,  speed: 0.08,  direction: 1,  opacity: 0.9,  letterSpacing: 3 },
  { text: 'CREATE',                     radius: 440,  fontSize: 18,  speed: 0.07,  direction: -1, opacity: 0.92, letterSpacing: 2 },
  { text: 'IMPACT',                     radius: 510,  fontSize: 19,  speed: 0.06,  direction: 1,  opacity: 0.94, letterSpacing: 2 },
  { text: 'IDEAS INTO IMPACT',          radius: 580,  fontSize: 20,  speed: 0.05,  direction: -1, opacity: 0.96, letterSpacing: 2 },
  { text: 'MITAOE ENTREPRENEURSHIP CELL', radius: 660, fontSize: 21, speed: 0.04,  direction: 1,  opacity: 0.97, letterSpacing: 1 },
  { text: 'E-CELL',                     radius: 750,  fontSize: 22,  speed: 0.035, direction: -1, opacity: 0.98, letterSpacing: 1 },
];

// ── Dot grid config ──
const DOT_SPACING = 24;
const DOT_RADIUS = 0.6;
const DOT_COLOR = 'rgba(255,255,255,0.08)';

interface SpiralCanvasProps {
  onComplete?: () => void;
}

export default function SpiralCanvas({ onComplete }: SpiralCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const anglesRef = useRef<number[]>(RINGS.map(() => 0));
  const lastTimeRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const holdProgressRef = useRef(0);
  const isHoldingRef = useRef(false);
  const isCompleteRef = useRef(false);
  const hasInteractedRef = useRef(false);

  const [isComplete, setIsComplete] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // ── Check session storage on mount ──
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem('ecell_spiral_seen');
      if (hasSeen === 'true') {
        isCompleteRef.current = true;
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    } catch {
      // storage blocked
    }
  }, [onComplete]);

  // ── Complete the intro ──
  const completeIntro = useCallback(() => {
    if (isCompleteRef.current) return;
    isCompleteRef.current = true;
    try { sessionStorage.setItem('ecell_spiral_seen', 'true'); } catch {}
    setIsComplete(true);
    if (onComplete) onComplete();
  }, [onComplete]);

  // ── Draw one frame ──
  const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number) => {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Clear
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, w, h);

    // Dot grid
    ctx.fillStyle = DOT_COLOR;
    for (let x = 0; x < w; x += DOT_SPACING * dpr) {
      for (let y = 0; y < h; y += DOT_SPACING * dpr) {
        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Combined progress: scroll OR hold
    const combinedProgress = Math.max(scrollProgressRef.current, holdProgressRef.current);

    // Zoom scale: as progress increases, rings expand outward (zoom into center)
    const zoomScale = 1 + combinedProgress * 4.5;

    // Draw rings
    for (let i = 0; i < RINGS.length; i++) {
      const ring = RINGS[i];
      const angle = anglesRef.current[i];
      const r = ring.radius * dpr * zoomScale;
      const fontSize = ring.fontSize * dpr;

      // Fade outer rings as we zoom
      let alpha = ring.opacity;
      if (combinedProgress > 0.3) {
        const fadeStart = 0.3 + (i / RINGS.length) * 0.4;
        if (combinedProgress > fadeStart) {
          alpha *= Math.max(0, 1 - (combinedProgress - fadeStart) / 0.3);
        }
      }

      if (alpha <= 0.01) continue;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.font = `500 ${fontSize}px 'Sora', 'Plus Jakarta Sans', system-ui, sans-serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Repeat text around the circle
      const fullText = (ring.text + '  ').repeat(20);
      const charAngleStep = (fontSize + ring.letterSpacing * dpr) / r;

      let charAngle = 0;
      for (let j = 0; j < fullText.length; j++) {
        if (charAngle > Math.PI * 2) break;

        const char = fullText[j];
        const x = Math.cos(charAngle) * r;
        const y = Math.sin(charAngle) * r;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(charAngle + Math.PI / 2);
        ctx.fillText(char, 0, 0);
        ctx.restore();

        charAngle += charAngleStep;
      }

      ctx.restore();
    }

    // Radial reveal hole (when progress > 0.5)
    if (combinedProgress > 0.5) {
      const holeProgress = (combinedProgress - 0.5) / 0.5; // 0→1 over last half
      const maxRadius = Math.sqrt(w * w + h * h) / 2 + 50 * dpr;
      const holeRadius = holeProgress * maxRadius * 0.4;

      if (holeRadius > 2) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Soft white glow at edge of hole
        ctx.save();
        const gradient = ctx.createRadialGradient(cx, cy, holeRadius * 0.9, cx, cy, holeRadius * 1.1);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.08 * holeProgress})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }
    }

    // Center label
    if (combinedProgress < 0.4) {
      const labelAlpha = Math.max(0, 1 - combinedProgress * 2.5);
      ctx.save();
      ctx.font = `500 ${11 * dpr}px 'IBM Plex Mono', monospace`;
      ctx.fillStyle = `rgba(255, 255, 255, ${labelAlpha * 0.7})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CLICK & HOLD', cx, cy - 8 * dpr);

      // Small blinking cursor dot
      if (Math.floor(Date.now() / 600) % 2 === 0) {
        ctx.beginPath();
        ctx.arc(cx, cy + 10 * dpr, 2 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }, []);

  // ── Animation loop ──
  const animate = useCallback((timestamp: number) => {
    if (isCompleteRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    // Delta time
    const dt = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = timestamp;

    // Update ring angles
    for (let i = 0; i < RINGS.length; i++) {
      anglesRef.current[i] += RINGS[i].speed * RINGS[i].direction * dt;
    }

    // Handle click-and-hold progress
    if (isHoldingRef.current) {
      holdProgressRef.current = Math.min(1, holdProgressRef.current + dt * 0.35);
    } else if (holdProgressRef.current > 0 && holdProgressRef.current < 0.95) {
      // Spring back
      holdProgressRef.current = Math.max(0, holdProgressRef.current - dt * 0.6);
    }

    if (holdProgressRef.current >= 1) {
      completeIntro();
      return;
    }

    setHoldProgress(holdProgressRef.current);

    draw(canvas, ctx, dpr);

    rafRef.current = requestAnimationFrame(animate);
  }, [draw, completeIntro]);

  // ── Setup canvas & GSAP ──
  useEffect(() => {
    if (isCompleteRef.current) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    // Size canvas
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    // Start animation
    rafRef.current = requestAnimationFrame(animate);

    // GSAP ScrollTrigger setup (dynamic import for SSR safety)
    let scrollTriggerInstance: any = null;
    let lenisInstance: any = null;

    const setupGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule;

        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default || LenisModule;

        // Init Lenis smooth scroll
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });

        lenisInstance.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time: number) => {
          lenisInstance?.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Scroll-driven progress
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: wrapper,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.8,
          onUpdate: (self: any) => {
            scrollProgressRef.current = self.progress;
            if (self.progress >= 0.98) {
              completeIntro();
            }
          },
        });
      } catch (err) {
        console.warn('[SpiralCanvas] GSAP/Lenis init error:', err);
      }
    };

    setupGSAP();

    // Hide hint after 3s
    const hintTimer = setTimeout(() => setShowHint(false), 4000);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(hintTimer);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, [animate, completeIntro]);

  // ── Pointer handlers (click-and-hold) ──
  const handlePointerDown = useCallback(() => {
    isHoldingRef.current = true;
    hasInteractedRef.current = true;
    setShowHint(false);
  }, []);

  const handlePointerUp = useCallback(() => {
    isHoldingRef.current = false;
  }, []);

  const handleSkip = useCallback(() => {
    completeIntro();
  }, [completeIntro]);

  // ── Keyboard: spacebar to hold ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        isHoldingRef.current = true;
        hasInteractedRef.current = true;
        setShowHint(false);
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
  }, []);

  // ── Reduced motion ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      completeIntro();
    }
  }, [completeIntro]);

  if (isComplete) return null;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: '#0A0A0A' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: isHoldingRef.current ? 'grabbing' : 'pointer', touchAction: 'none' }}
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-white/50 hover:text-white/80 transition-all backdrop-blur-sm"
      >
        Skip
      </button>

      {/* Bottom hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-700"
        style={{ opacity: showHint ? 1 : 0 }}
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/8 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/40">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1"/>
              <circle cx="8" cy="8" r="2" fill="currentColor"/>
            </svg>
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
              Scroll to dive in
            </span>
          </div>
        </div>
      </div>

      {/* Hold progress indicator */}
      {holdProgress > 0.01 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50">
          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/60 rounded-full transition-all duration-75"
              style={{ width: `${holdProgress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Brand mark (top left) */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
          <span className="text-[10px] font-mono font-bold text-white/70 tracking-tight">EC</span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
          E-Cell MITAOE
        </span>
      </div>
    </div>
  );
}

