/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#28439D',
        'brand-base': '#3855B3',
        white: {
          100: '#FFF',
          200: '#F7FAFC',
          300: '#EAEAEA',
          400: '#E7EAEE',
        },
        black: {
          100: '#000',
          200: '#181819',
          300: '#121127',
          400: '#191D23',
        },
        grey: {
          200: '#64748B',
        },
      },
      backgroundImage: {
        theme: 'linear-gradient(111.34deg, #10277C 0%, #28439D 100%);',
      },
    },
  },
  plugins: [],
}
