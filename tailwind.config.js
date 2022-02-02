module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', '/public/index.html'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        slideOut: 'slideOut .5s ease-in 1',
        slideIn: 'slideIn .7s ease-out 1',
      },
      keyframes: {
        slideOut: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '50%': {
            transform: 'translateX(120%)',
          },
          '75%': {
            height: '100%',
          },
          '100%': {
            height: '0%',
          }
        },
        slideIn: {
          '0%': {
            transform: 'translateX(120%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0%)',
            opacity: '1'
          }
        }
      }
    },
  },
  plugins: [],
}
