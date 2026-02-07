import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        },
        trading: {
          yes: '#22c55e',
          no: '#ef4444',
          bid: '#22c55e',
          ask: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
