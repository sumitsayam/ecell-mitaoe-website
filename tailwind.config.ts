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
        // Design system official tokens
        canvas: '#FAF8F2',
        primary: {
          DEFAULT: '#092957',
          deep: '#061B36',
          secondary: '#244B7A',
        },
        body: '#253247',
        muted: '#687386',
        borderToken: '#E2E5E9',
        surface: {
          pale: '#EDF2F8',
          white: '#FFFFFF',
        },

        // Color aliases for backward compatibility & rich shades
        cream: {
          50: '#FDFCF7',
          100: '#FAF8F2', // Updated to exact token
          150: '#F4F1E6',
          200: '#EAE5D8',
          300: '#DCD4C2',
          400: '#C5BAA4',
          500: '#A99D85',
        },
        navy: {
          50: '#EDF2F8',
          100: '#DCE6F2',
          200: '#B8CDE5',
          700: '#244B7A', // Secondary blue token
          800: '#143865',
          850: '#092957', // Primary navy token
          900: '#061B36', // Deep navy token
          950: '#041224',
        },
        ink: {
          DEFAULT: '#253247', // Body text token
          light: '#3C4B62',
          muted: '#687386', // Muted text token
        }
      },
      maxWidth: {
        'site': '1440px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'soft-card': '0 2px 12px -2px rgba(9, 41, 87, 0.05), 0 1px 3px 0 rgba(9, 41, 87, 0.03)',
        'elevated': '0 10px 28px -4px rgba(9, 41, 87, 0.08), 0 3px 8px -2px rgba(9, 41, 87, 0.04)',
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        fadeIn: 'fadeIn 0.35s ease-out forwards',
      }
    },
  },
  plugins: [],
};
export default config;
