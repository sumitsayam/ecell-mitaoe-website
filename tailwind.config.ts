import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        line: 'var(--line)',
        background: {
          DEFAULT: 'var(--bg)',
          soft: 'var(--color-primary-soft)',
          surface: 'var(--color-surface)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          pale: 'var(--bg)',
          soft: 'var(--color-primary-soft)',
          hover: 'var(--color-surface-hover)',
          white: 'var(--color-surface)',
        },
        foreground: {
          DEFAULT: 'var(--ink)',
        },
        primary: {
          DEFAULT: 'var(--accent)',
          deep: 'var(--ink)',
          dark: 'var(--color-primary-dark)',
          soft: 'var(--color-primary-soft)',
          50: 'var(--color-primary-soft)',
          100: 'var(--color-primary-soft)',
          600: 'var(--accent)',
          700: 'var(--color-primary-dark)',
          800: 'var(--color-primary-dark)',
          900: 'var(--ink)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          light: 'var(--color-muted)',
          dark: 'var(--color-muted)',
        },
        borderToken: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--line)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--line)',
        },
        body: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--color-muted)',
          light: 'var(--color-muted)',
        },
        canvas: {
          DEFAULT: 'var(--bg)',
          paper: 'var(--color-surface)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          blue: 'var(--accent)',
          yellow: 'var(--color-accent-yellow)',
        },
      },
      maxWidth: {
        site: '1440px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'soft-card': '0 2px 14px -2px rgba(21, 94, 239, 0.06), 0 1px 3px 0 rgba(21, 94, 239, 0.03)',
        elevated: '0 12px 32px -4px rgba(21, 94, 239, 0.1), 0 4px 10px -2px rgba(21, 94, 239, 0.04)',
        paper: '0 4px 20px -2px rgba(16, 27, 50, 0.06), 0 1px 3px rgba(16, 27, 50, 0.04)',
        'dark-glow': '0 0 35px -5px rgba(21, 94, 239, 0.25)',
      },
      borderRadius: {
        card: '1.25rem', // 20px
        'card-lg': '1.75rem', // 28px
        pill: '9999px',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
