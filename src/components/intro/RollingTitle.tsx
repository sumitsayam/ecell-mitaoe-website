'use client';

import React, { useRef, useEffect, useCallback } from 'react';

/* ────────────────────────────────────────────────────────────────────────
 *  RollingTitle — In-Place Character Scramble & Cipher Hover Animation
 *
 *  Specifications:
 *  • Line 1: "E-CELL" in --accent
 *  • Line 2: "MIT AOE" in --ink (with real space)
 *  • In-place character scrambling (hacker/matrix cipher morph) on hover
 *  • Individual letter hover & full title hover sweeps
 *  • Absolutely NO vertical strip, NO translateY, NO stacked cells
 *  • Completely eliminates any upward or downward clipping artifacts
 *  • Zero layout shift: normal-flow invisible anchor locks exact character box
 *  • Direct DOM textContent manipulation via rAF (0 React re-renders)
 *  • Real text with aria-label="E-Cell MIT AOE" for SEO & accessibility
 *  • prefers-reduced-motion: static display with no scramble
 * ────────────────────────────────────────────────────────────────────── */

const STANDARD_GLYPHS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$&*+?<>~%@';
const NARROW_GLYPHS = '!|/:;1ilI[]';

function getRandomGlyph(target: string): string {
  if (target === ' ' || target === '\u00A0') return '\u00A0';
  if (target === 'I' || target === '-') {
    return NARROW_GLYPHS[Math.floor(Math.random() * NARROW_GLYPHS.length)];
  }
  return STANDARD_GLYPHS[Math.floor(Math.random() * STANDARD_GLYPHS.length)];
}

interface LetterCol {
  char: string;
  isSpace: boolean;
  globalIndex: number;
}

const LINE_1 = 'E-CELL';
const LINE_2 = 'MIT AOE';

let counter = 0;
const LINE_1_COLS: LetterCol[] = LINE_1.split('').map((char) => ({
  char,
  isSpace: char === ' ',
  globalIndex: counter++,
}));

const LINE_2_COLS: LetterCol[] = LINE_2.split('').map((char) => ({
  char,
  isSpace: char === ' ',
  globalIndex: counter++,
}));

const ALL_COLS: LetterCol[] = [...LINE_1_COLS, ...LINE_2_COLS];
const TOTAL_CHARS = ALL_COLS.length;

export function RollingTitle({ className = '' }: { className?: string }) {
  const charDisplayRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const charEndTimesRef = useRef<number[]>([]);
  const charStartTimesRef = useRef<number[]>([]);
  const rafIdRef = useRef<number>(0);
  const isLoopRunningRef = useRef<boolean>(false);
  const frameCountRef = useRef<number>(0);

  // Initialize timing arrays
  useEffect(() => {
    charEndTimesRef.current = new Array(TOTAL_CHARS).fill(0);
    charStartTimesRef.current = new Array(TOTAL_CHARS).fill(0);
  }, []);

  // Main animation frame loop
  const step = useCallback(() => {
    const now = performance.now();
    frameCountRef.current++;
    const shouldUpdateGlyph = frameCountRef.current % 2 === 0; // ~30fps glyph changes for crisp legibility
    let anyActive = false;

    for (let i = 0; i < TOTAL_CHARS; i++) {
      const col = ALL_COLS[i];
      if (col.isSpace) continue;

      const span = charDisplayRefs.current[i];
      if (!span) continue;

      const startTime = charStartTimesRef.current[i] || 0;
      const endTime = charEndTimesRef.current[i] || 0;

      if (now < startTime) {
        // Not started yet (wave stagger delay)
        anyActive = true;
        continue;
      }

      if (now < endTime) {
        // Active scramble
        anyActive = true;
        if (shouldUpdateGlyph) {
          span.textContent = getRandomGlyph(col.char);
        }
      } else if (endTime > 0) {
        // Just finished: lock onto target character
        span.textContent = col.char;
        charEndTimesRef.current[i] = 0;
        charStartTimesRef.current[i] = 0;
      }
    }

    if (anyActive) {
      rafIdRef.current = requestAnimationFrame(step);
    } else {
      isLoopRunningRef.current = false;
      // Ensure all characters are locked
      for (let i = 0; i < TOTAL_CHARS; i++) {
        const col = ALL_COLS[i];
        const span = charDisplayRefs.current[i];
        if (span && !col.isSpace) {
          span.textContent = col.char;
        }
      }
    }
  }, []);

  const startLoopIfNeeded = useCallback(() => {
    if (!isLoopRunningRef.current) {
      isLoopRunningRef.current = true;
      rafIdRef.current = requestAnimationFrame(step);
    }
  }, [step]);

  // Trigger full title scramble wave (left to right)
  const triggerFullScramble = useCallback(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;
    }

    const now = performance.now();
    for (let i = 0; i < TOTAL_CHARS; i++) {
      const col = ALL_COLS[i];
      if (col.isSpace) continue;

      // Stagger start time across columns (30ms per col)
      const stagger = i * 30;
      charStartTimesRef.current[i] = now + stagger;
      // Scramble duration: 240ms
      charEndTimesRef.current[i] = now + stagger + 240;
    }

    startLoopIfNeeded();
  }, [startLoopIfNeeded]);

  // Trigger single character scramble on individual hover
  const scrambleSingleChar = useCallback(
    (index: number) => {
      if (typeof window !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
      }

      const col = ALL_COLS[index];
      if (!col || col.isSpace) return;

      const now = performance.now();
      charStartTimesRef.current[index] = now;
      charEndTimesRef.current[index] = now + 240; // 240ms duration
      startLoopIfNeeded();
    },
    [startLoopIfNeeded]
  );

  // Play once on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerFullScramble();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [triggerFullScramble]);

  const renderColumn = (col: LetterCol) => {
    if (col.isSpace) {
      return (
        <span
          key={`space-${col.globalIndex}`}
          className="inline-block leading-none select-none"
          style={{ width: '0.28em' }}
          aria-hidden="true"
        >
          &nbsp;
        </span>
      );
    }

    return (
      <span
        key={`col-${col.globalIndex}`}
        className="relative inline-block text-center align-baseline cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95"
        onPointerEnter={() => scrambleSingleChar(col.globalIndex)}
        aria-hidden="true"
      >
        {/* Invisible anchor character in normal flow: locks exact width and height */}
        <span className="invisible select-none leading-none block" style={{ lineHeight: 1 }}>
          {col.char}
        </span>

        {/* In-place display character: absolutely centered, zero vertical overflow */}
        <span
          ref={(el) => {
            charDisplayRefs.current[col.globalIndex] = el;
          }}
          className="absolute inset-0 flex items-center justify-center select-none leading-none"
          style={{ lineHeight: 1 }}
        >
          {col.char}
        </span>
      </span>
    );
  };

  return (
    <h1
      className={`select-none font-display font-extrabold text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] xl:text-[15rem] tracking-tighter leading-[0.88] text-center cursor-default ${className}`}
      aria-label="E-Cell MIT AOE"
      onPointerEnter={triggerFullScramble}
      onClick={triggerFullScramble}
    >
      {/* Line 1: E-CELL in --accent */}
      <span className="block text-[var(--accent)]">
        {LINE_1_COLS.map(renderColumn)}
      </span>

      {/* Line 2: MIT AOE in --ink */}
      <span className="block text-[var(--ink)]">
        {LINE_2_COLS.map(renderColumn)}
      </span>
    </h1>
  );
}
