/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:     '#050508',
        surface:     '#080810',
        card:        '#0a0a12',
        border:      '#1a1a2e',
        accent:      '#00D4FF',
        accentDark:  '#0099BB',
        accentGreen: '#00FF94',
      },
      fontFamily: {
        heading: ["'Orbitron'", 'sans-serif'],
        body:    ["'JetBrains Mono'", 'monospace'],
        mono:    ["'JetBrains Mono'", 'monospace'],
      },
      animation: {
        marquee:      'marqueeRun 28s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        flicker:      'flicker 5s linear infinite',
        float:        'float 5s ease-in-out infinite',
      },
      keyframes: {
        marqueeRun: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        flicker: {
          '0%,100%':   { opacity: '1' },
          '42%':       { opacity: '1' },
          '42.5%':     { opacity: '0' },
          '43%':       { opacity: '1' },
          '48%':       { opacity: '1' },
          '48.5%':     { opacity: '0' },
          '49%':       { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-18px)' },
        },
      },
      boxShadow: {
        neon:    '0 0 20px rgba(0,212,255,0.3)',
        'neon-sm':'0 0 8px rgba(0,212,255,0.2)',
        'neon-lg':'0 0 40px rgba(0,212,255,0.5)',
      },
    },
  },
  plugins: [],
}