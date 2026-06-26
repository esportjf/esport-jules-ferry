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
        neon: {
          blue: '#A259FF',    // violet néon lumineux
          purple: '#7B3FE4',  // violet identité (couleur propre de la section)
          pink: '#E040FB',    // magenta électrique (accent chaud)
          cyan: '#00D4FF',    // cyan glacé (données, scores)
        },
        dark: {
          900: '#06040F',  // noir spatial
          800: '#0D0B1F',  // fond cards, violet très sombre
          700: '#160D38',  // sections alternées, violet abyssal
          600: '#2D1B69',  // bordures, violet foncé visible
        },
        lavender: '#EDE8FF',
        gold: '#FFD700',
      },
      fontFamily: {
        gaming: ['Orbitron', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'glow': 'glow 2.5s ease-in-out infinite alternate',
        'float': 'float 4s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 8px rgba(123,63,228,0.5), 0 0 25px rgba(123,63,228,0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(162,89,255,0.8), 0 0 50px rgba(162,89,255,0.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gaming': 'linear-gradient(135deg, #06040F 0%, #160D38 50%, #06040F 100%)',
      },
    },
  },
  plugins: [],
}
export default config
