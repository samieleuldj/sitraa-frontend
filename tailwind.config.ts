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
        primary: '#9B6B7A',
        secondary: '#F5E6E0',
        accent: '#D4849A',
        cream: '#FDF8F5',
        nude: '#E8D5CE',
        mocha: '#6B5344',
        background: '#FDF8F5',
        text: '#3D2C2E',
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
