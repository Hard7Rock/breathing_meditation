/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'breathe-in': 'breatheIn 4s ease-in-out',
        'breathe-hold': 'breatheHold 7s ease-in-out',
        'breathe-out': 'breatheOut 8s ease-in-out',
      },
      keyframes: {
        breatheIn: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.5)' },
        },
        breatheHold: {
          '0%, 100%': { transform: 'scale(1.5)' },
        },
        breatheOut: {
          '0%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
