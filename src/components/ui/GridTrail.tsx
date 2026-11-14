'use client';

import React, { useRef, useEffect } from 'react';

/* ────────────────────────────────────────────────────────────────────────
 *  GridTrail — Fixed Background Grid with Bresenham Cursor Decay Trail
 *
 *  Specifications:
 *  • Fixed, full-viewport layer behind all content (z-index 0, pointer-events: none)
 *  • Grid lines in CSS (two 1px linear gradients, cell size --cell: 32px desktop, 24px mobile)
 *  • Single <canvas> in fixed layer draws ONLY lit cells, DPR capped at 1.5
 *  • Cell index math: col = floor(x / CELL), row = floor(y / CELL), index = row * cols + col
 *  • Bresenham line algorithm from previous cell to new cell so rapid pointer moves leave zero gaps
 *  • Frame decay: intensity = intensity * exp(-dt / 260ms), removed when intensity < 0.02
 *  • Draw per active cell: fill accent at intensity * 0.28, outline at intensity * 0.60
 *  • Head cell (under pointer) gets crisp 2px outline
 *  • rAF loop runs ONLY while active cells exist, stops when idle (0 idle CPU/GPU work)
 *  • Skips trail on (hover: none) and prefers-reduced-motion; CSS grid remains
 *  • Re-reads accent color on theme switch; recomputes cols/rows on resize
 * ────────────────────────────────────────────────────────────────────── */

function hexOrRgbToRgb(str: string): [number, number, number] {
  const trimmed = str.trim();
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) hex = hex.split('').map((x) => x + x).join('');
    const num = parseInt(hex, 16);
    if (!isNaN(num)) {
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
  } else if (trimmed.startsWith('rgb')) {
    const match = trimmed.match(/\d+/g);
    if (match && match.length >= 3) {
      return [parseInt(match[0], 10), parseInt(match[1], 10), parseInt(match[2], 10)];
    }
  }
  return [43, 92, 230]; // Default light accent #2b5ce6
}

export function GridTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intensitiesRef = useRef<Float32Array>(new Float32Array(0));
  const activeIndicesRef = useRef<Set<number>>(new Set());
  const headIndexRef = useRef<number>(-1);
  const prevCellRef = useRef<{ col: number; row: number } | null>(null);

  const colsRef = useRef<number>(0);
  const rowsRef = useRef<number>(0);
  const cellRef = useRef<number>(32);
  const dprRef = useRef<number>(1);
  const accentRgbRef = useRef<[number, number, number]>([43, 92, 230]);

  const rafRef = useRef<number>(0);
  const rafRunningRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(0);

  // Update accent color from CSS variables
  const updateAccentColor = () => {
    if (typeof window === 'undefined') return;
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue('--accent') || '#2b5ce6';
    accentRgbRef.current = hexOrRgbToRgb(accent);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    updateAccentColor();

    // Listen to theme attribute mutations on <html>
    const themeObserver = new MutationObserver(() => {
      updateAccentColor();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      dprRef.current = dpr;

      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      const isMobile = w <= 640;
      const CELL = isMobile ? 24 : 32;
      cellRef.current = CELL;

      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      colsRef.current = cols;
      rowsRef.current = rows;

      // Allocate fresh intensity buffer
      const newBuffer = new Float32Array(cols * rows);
      intensitiesRef.current = newBuffer;
      activeIndicesRef.current.clear();
      headIndexRef.current = -1;
      prevCellRef.current = null;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── Bresenham Line Cell Stepper ──
    const walkBresenham = (
      c0: number,
      r0: number,
      c1: number,
      r1: number,
      onCell: (c: number, r: number) => void
    ) => {
      const dx = Math.abs(c1 - c0);
      const dy = Math.abs(r1 - r0);
      const sx = c0 < c1 ? 1 : -1;
      const sy = r0 < r1 ? 1 : -1;
      let err = dx - dy;

      let c = c0;
      let r = r0;

      while (true) {
        onCell(c, r);
        if (c === c1 && r === r1) break;
        const e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          c += sx;
        }
        if (e2 < dx) {
          err += dx;
          r += sy;
        }
      }
    };

    // ── Render Lit Cells ──
    const renderLitCells = () => {
      const dpr = dprRef.current;
      const CELL = cellRef.current;
      const cols = colsRef.current;
      const intensities = intensitiesRef.current;
      const activeIndices = activeIndicesRef.current;
      const headIdx = headIndexRef.current;
      const [r, g, b] = accentRgbRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      activeIndices.forEach((idx) => {
        const intensity = intensities[idx];
        if (intensity <= 0) return;

        const c = idx % cols;
        const row = Math.floor(idx / cols);
        const x = c * CELL;
        const y = row * CELL;

        // Fill accent with subtle, elegant luminous glow
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(intensity * 0.12).toFixed(3)})`;
        ctx.fillRect(x, y, CELL, CELL);

        // Accent outline: refined 1px border
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(intensity * 0.35).toFixed(3)})`;
        ctx.lineWidth = idx === headIdx ? 1.5 : 1;
        ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
      });

      ctx.restore();
    };

    // ── rAF Loop: Runs ONLY while cells are active ──
    const loop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min(64, timestamp - lastTimeRef.current);
      lastTimeRef.current = timestamp;

      // Exponential decay: intensity * exp(-dt / 220)
      const decay = Math.exp(-dt / 220);
      const intensities = intensitiesRef.current;
      const activeIndices = activeIndicesRef.current;

      const toRemove: number[] = [];
      activeIndices.forEach((idx) => {
        intensities[idx] *= decay;
        if (intensities[idx] < 0.02) {
          intensities[idx] = 0;
          toRemove.push(idx);
        }
      });

      toRemove.forEach((idx) => activeIndices.delete(idx));

      renderLitCells();

      if (activeIndices.size === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rafRunningRef.current = false;
        headIndexRef.current = -1;
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const startLoopIfNeeded = () => {
      if (!rafRunningRef.current) {
        rafRunningRef.current = true;
        lastTimeRef.current = performance.now();
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    // ── Pointer Move Listener ──
    const handlePointerMove = (e: PointerEvent) => {
      // Check (hover: none) or prefers-reduced-motion
      if (window.matchMedia('(hover: none)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const CELL = cellRef.current;
      const cols = colsRef.current;
      const rows = rowsRef.current;
      if (cols === 0 || rows === 0) return;

      const col = Math.floor(e.clientX / CELL);
      const row = Math.floor(e.clientY / CELL);

      if (col < 0 || col >= cols || row < 0 || row >= rows) return;

      const setLit = (c: number, r: number) => {
        if (c < 0 || c >= cols || r < 0 || r >= rows) return;
        const index = r * cols + c;
        intensitiesRef.current[index] = 1.0;
        activeIndicesRef.current.add(index);
      };

      const prev = prevCellRef.current;
      if (!prev) {
        setLit(col, row);
      } else {
        walkBresenham(prev.col, prev.row, col, row, setLit);
      }

      headIndexRef.current = row * cols + col;
      prevCellRef.current = { col, row };

      startLoopIfNeeded();
    };

    const handlePointerLeave = () => {
      prevCellRef.current = null;
      headIndexRef.current = -1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      themeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* ── CSS Grid Lines (zero canvas drawing cost) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--line) 1px, transparent 1px)
          `,
          backgroundSize: 'var(--cell) var(--cell)',
        }}
      />

      {/* ── Active Lit Cells Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}

