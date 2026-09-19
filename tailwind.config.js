/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          void: '#050811',
          bg: '#0A0F1D',
          card: 'rgba(13, 20, 36, 0.75)',
          panel: 'rgba(16, 24, 45, 0.85)',
          border: 'rgba(56, 189, 248, 0.15)',
          borderLight: 'rgba(255, 255, 255, 0.08)',
          glow: '#00f2fe',
          cyan: '#38bdf8',
          blue: '#0284c7',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          purple: '#8b5cf6',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.4))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 30px rgba(56, 189, 248, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
