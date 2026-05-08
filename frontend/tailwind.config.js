/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        primary: '#FAF7F2',
        secondary: '#FFFDF8',
        gold: '#D4A017',
        orange: '#FF7A00',
        amber: '#FFB547',
        muted: '#5E5E5E',
        dark: '#111111',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(43,82%,46%,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(29,100%,50%,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(36,100%,64%,0.08) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
