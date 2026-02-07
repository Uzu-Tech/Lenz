/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lenz: {
          bg: '#0a0a0f',
          surface: '#12121a',
          surfaceHover: '#1a1a25',
          border: '#252532',
          accent: '#6366f1',
          accentHover: '#818cf8',
          success: '#22c55e',
          danger: '#ef4444',
          muted: '#71717a',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(99, 102, 241, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
