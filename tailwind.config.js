/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // or 'class' for manual dark mode toggle
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(41, 41, 41)',
          light: 'rgb(81, 81, 81)',
        },
        secondary: 'rgb(130, 130, 130)',
        accent: 'rgb(227, 227, 227)',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'sans-serif'],
        'grape-nuts': ['var(--font-grape-nuts)', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'subtleFloat 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '128': '32rem',
      },
      borderWidth: {
        '1': '1px',
      },
      maxWidth: {
        'prose-narrow': '45ch',
        'prose-wide': '80ch',
      },
    },
  },
  plugins: [],
}; 