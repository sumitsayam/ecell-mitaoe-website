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
        cream: {
          50: '#FDFCF7',
          100: '#FAF7F0',
          150: '#F5F1E7',
          200: '#EDE7D9',
          300: '#DDD4C1',
          400: '#C7BBA5',
          500: '#AC9C83',
        },
        navy: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          700: '#1D3B6F',
          800: '#13284F',
          850: '#0B1B3D',
          900: '#07152E',
          950: '#040C1D',
        },
        ink: {
          DEFAULT: '#060F19',
          light: '#233246',
          muted: '#5F6C80',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'soft-card': '0 4px 20px -2px rgba(11, 27, 61, 0.05), 0 2px 6px -1px rgba(11, 27, 61, 0.03)',
        'elevated': '0 12px 32px -4px rgba(11, 27, 61, 0.08), 0 4px 12px -2px rgba(11, 27, 61, 0.04)',
        'glow-navy': '0 0 24px -2px rgba(11, 27, 61, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pulseSlow: 'pulseSlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;
