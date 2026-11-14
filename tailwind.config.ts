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
          DEFAULT: '#F8FAFF',
          soft: '#E7F0FF',
          surface: '#FFFFFF',
          dark: '#0B1020',
          'dark-surface': '#121C32',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          pale: '#F8FAFF',
          soft: '#E7F0FF',
          dark: '#0B1020',
          darkSurface: '#121C32',
          white: '#FFFFFF',
        },
        foreground: {
          DEFAULT: '#101B32',
          dark: '#F5F8FF',
        },
        primary: {
          DEFAULT: '#155EEF',
          dark: '#0B347C',
          soft: '#E7F0FF',
          50: '#F0F6FF',
          100: '#E7F0FF',
          200: '#C2D9FF',
          600: '#155EEF',
          700: '#0B347C',
          800: '#082559',
          900: '#05183B',
          deep: '#0B347C',
        },
        muted: {
          DEFAULT: '#6B7890',
          light: '#94A3B8',
          dark: '#475569',
        },
        borderToken: {
          DEFAULT: '#DCE5F2',
          subtle: '#E2E8F0',
          dark: '#1E293B',
        },
        border: {
          DEFAULT: '#DCE5F2',
          subtle: '#E2E8F0',
          dark: '#1E293B',
        },
        dark: {
          DEFAULT: '#0B1020',
          surface: '#121C32',
          text: '#F5F8FF',
        },
        // Legacy backward compatibility
        body: {
          DEFAULT: '#101B32',
          muted: '#6B7890',
          light: '#94A3B8',
        },
        canvas: {
          DEFAULT: '#F8FAFF',
          paper: '#FFFFFF',
          dark: '#0B1020',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          blue: '#155EEF',
          orange: '#EE7747',
          yellow: '#F2C95C',
          sky: '#E7F0FF',
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
        card: '16px',
        'card-lg': '20px',
        pill: '9999px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
