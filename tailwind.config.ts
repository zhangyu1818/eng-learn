import type { Config } from 'tailwindcss'

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-react-aria-components'),
  ],
} satisfies Config

export default config
