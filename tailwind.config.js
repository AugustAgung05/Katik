/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './public/src/**/*.js'],
  theme: {
    container: {
      center: true,
      padding: '32px'
    },
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        '4xl': ['30px', '36px'],
        'xbase': ['16px', '24px'],
        'base': ['14px', '22px'],
        'sm': ['12px', '16px'],
        'xs': ['10px', '14px'],
        'xxs': ['8px', '12px'],
      },
      colors: {
        'primary': '#FFB800',
        'secondary': '#F8F9FA',
        'footer': '#723B13',
        'navigation': '#C27803',
        'calculation': '#ECECEC',
        'button': '#1E90FF',
        'border': '#E2E8F0',
      },
      screens: {
        'l': '900px',
        'sm': '600px',
        's': '470px',
        'xs' : '364px',
      },
    },
  },
  plugins: [],
}

