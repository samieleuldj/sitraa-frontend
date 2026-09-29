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
        primary: '#7C3A6B',
        secondary: '#E8B4BC',
        accent: '#F43F5E',
        background: '#F8FAFC',
        text: '#1E293B',
      },
    },
  },
  plugins: [],
}
export default config
