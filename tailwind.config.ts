import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        'void-soft': '#0a0a0a',
        'void-lighter': '#111111',
        terminal: {
          green: '#00FF41',
          'green-dim': 'rgba(0, 255, 65, 0.5)',
          'green-glow': 'rgba(0, 255, 65, 0.2)',
        },
        holo: {
          magenta: '#ff00ff',
          cyan: '#00ffff',
          yellow: '#ffff00',
          pearl: 'rgba(255, 255, 255, 0.1)',
        },
        neural: {
          pulse: '#6366f1',
          spark: '#a855f7',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'terminal-blink': 'blink 1s step-end infinite',
        'neural-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'scanline': 'scanline 8s linear infinite',
        'holo-shift': 'holoShift 3s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        holoShift: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg)',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            filter: 'hue-rotate(30deg)',
          },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3), 0 0 60px rgba(0, 255, 65, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 255, 65, 0.8), 0 0 60px rgba(0, 255, 65, 0.5), 0 0 90px rgba(0, 255, 65, 0.3)',
          },
        },
      },
      backgroundImage: {
        'holo-gradient': 'linear-gradient(135deg, #ff00ff 0%, #00ffff 25%, #ffff00 50%, #ff00ff 75%, #00ffff 100%)',
        'void-gradient': 'radial-gradient(ellipse at center, #111111 0%, #000000 70%)',
        'neural-gradient': 'linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
      },
      boxShadow: {
        'terminal': '0 0 20px rgba(0, 255, 65, 0.5)',
        'terminal-lg': '0 0 40px rgba(0, 255, 65, 0.3)',
        'holo': '0 0 30px rgba(255, 0, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.2)',
        'inner-glow': 'inset 0 0 30px rgba(0, 255, 65, 0.1)',
      },
    },
  },
  plugins: [],
}
export default config
