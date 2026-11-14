'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
 *  RollingTitle — Odometer-Style Rolling Hover Animation
 *
 *  Specifications:
 *  • Line 1: "E-CELL" in --accent
 *  • Line 2: "MIT AOE" in --ink (with real space)
 *  • Heavy grotesk / display font matching cover typography
 *  • Real text with aria-label="E-Cell MIT AOE" for SEO & accessibility
 *  • Zero Cumulative Layout Shift (real letter in normal flow sets width/height)
 *  • 7-cell strip per column: [real letter, 5 random glyphs, real letter]
 *  • Glyphs from: 0123456789 #$%&@*+=?/<>{}[]|~^
 *  • WAAPI transform animation: translateY(0) -> translateY(-(6/7)*100%)
 *  • 700ms duration, cubic-bezier(.7, 0, .2, 1), delay = columnIndex * 45ms
 *  • will-change: transform active only during run
 *  • Re-arms on completion, ignores hovers while running
 *  • prefers-reduced-motion: no roll
 * ────────────────────────────────────────────────────────────────────── */

const GLYPH_POOL = '0123456789#$%&@*+=?/<>{}[]|~^';

function getRandomGlyph(): string {
  const idx = Math.floor(Math.random() * GLYPH_POOL.length);
  return GLYPH_POOL[idx];
}

interface LetterCol {
  char: string;
  isSpace: boolean;
  globalIndex: number;
}

const LINE_1 = 'E-CELL';
const LINE_2 = 'MIT AOE';

export function RollingTitle({ className = '' }: { className?: string }) {
  const isRunningRef = useRef<boolean>(false);
  const stripsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // 5 random glyphs per column, re-randomized before each run
  const [randomGlyphs, setRandomGlyphs] = useState<string[][]>(() => {
    const totalChars = LINE_1.length + LINE_2.length;
    return Array.from({ length: totalChars }, () =>
      Array.from({ length: 5 }, () => getRandomGlyph())
    );
  });

  const randomizeMiddleCells = useCallback(() => {
    const totalChars = LINE_1.length + LINE_2.length;
    const next: string[][] = [];
    for (let i = 0; i < totalChars; i++) {
      next.push(Array.from({ length: 5 }, () => getRandomGlyph()));
    }
    setRandomGlyphs(next);
  }, []);

  const triggerRoll = useCallback(() => {
    if (isRunningRef.current) return;

    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;
    }

    isRunningRef.current = true;
    randomizeMiddleCells();

    // Use requestAnimationFrame so the re-randomized middle cells commit before WAAPI starts
    requestAnimationFrame(() => {
      const strips = stripsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (strips.length === 0) {
        isRunningRef.current = false;
        return;
      }

      const animPromises: Promise<Animation>[] = [];

      strips.forEach((strip) => {
        const colIdx = Number(strip.dataset.colIndex || 0);
        strip.style.willChange = 'transform';

        const animation = strip.animate(
          [
            { transform: 'translateY(0%)' },
            { transform: 'translateY(-85.714285%)' }, // -(6/7) * 100%
          ],
          {
            duration: 700,
            easing: 'cubic-bezier(0.7, 0, 0.2, 1)',
            delay: colIdx * 45,
            fill: 'forwards',
          }
        );

        animPromises.push(animation.finished);
      });

      Promise.all(animPromises)
        .then(() => {
          strips.forEach((strip) => {
            strip.style.willChange = 'auto';
            strip.style.transform = 'translateY(0%)';
          });
          isRunningRef.current = false;
        })
        .catch(() => {
          isRunningRef.current = false;
        });
    });
  }, [randomizeMiddleCells]);

  // Play once on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerRoll();
    }, 200);
    return () => clearTimeout(timer);
  }, [triggerRoll]);

  let globalCounter = 0;
  const line1Cols: LetterCol[] = LINE_1.split('').map((char) => ({
    char,
    isSpace: char === ' ',
    globalIndex: globalCounter++,
  }));

  const line2Cols: LetterCol[] = LINE_2.split('').map((char) => ({
    char,
    isSpace: char === ' ',
    globalIndex: globalCounter++,
  }));

  const renderColumn = (col: LetterCol) => {
    if (col.isSpace) {
      return (
        <span
          key={`space-${col.globalIndex}`}
          className="inline-block leading-none select-none"
          style={{ width: '0.3em' }}
          aria-hidden="true"
        >
          &nbsp;
        </span>
      );
    }

    const middleGlyphs = randomGlyphs[col.globalIndex] || ['#', '%', '&', '*', '?'];

    return (
      <span
        key={`col-${col.globalIndex}`}
        className="relative inline-block overflow-hidden leading-none align-top"
        style={{ lineHeight: 1 }}
        aria-hidden="true"
      >
        {/* Normal-flow character: maintains exact width and height, 0 CLS */}
        <span className="invisible select-none leading-none block" style={{ lineHeight: 1 }}>
          {col.char}
        </span>

        {/* 7-cell absolute strip */}
        <span
          ref={(el) => {
            stripsRef.current[col.globalIndex] = el;
          }}
          data-col-index={col.globalIndex}
          className="absolute top-0 left-0 w-full flex flex-col leading-none"
          style={{ transform: 'translateY(0%)', lineHeight: 1 }}
        >
          {/* Cell 0: Real letter */}
          <span className="block leading-none text-center select-none" style={{ lineHeight: 1 }}>
            {col.char}
          </span>
          {/* Cells 1..5: Random glyphs */}
          {middleGlyphs.map((glyph, gIdx) => (
            <span
              key={gIdx}
              className="block leading-none text-center select-none"
              style={{ lineHeight: 1 }}
            >
              {glyph}
            </span>
          ))}
          {/* Cell 6: Real letter */}
          <span className="block leading-none text-center select-none" style={{ lineHeight: 1 }}>
            {col.char}
          </span>
        </span>
      </span>
    );
  };

  return (
    <h1
      className={`select-none font-display font-extrabold text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] xl:text-[15rem] tracking-tighter leading-[0.84] text-center cursor-default ${className}`}
      aria-label="E-Cell MIT AOE"
      onPointerEnter={triggerRoll}
      onClick={triggerRoll}
    >
      {/* Line 1: E-CELL in --accent */}
      <span className="block text-[var(--accent)]">
        {line1Cols.map(renderColumn)}
      </span>

      {/* Line 2: MIT AOE in --ink */}
      <span className="block text-[var(--ink)]">
        {line2Cols.map(renderColumn)}
      </span>
    </h1>
  );
}
