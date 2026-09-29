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
        primary: '#9D6B78',
        secondary: '#E6D3D3',
        accent: '#D49A89',
        background: '#FAF7F5',
        text: '#2C2424',
      },
    },
  },
  plugins: [],
}
export default config
