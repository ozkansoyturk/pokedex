import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1100px',
        xl: '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        rotatePokeBall: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        loadingOut: {
          '0%': { top: '0' },
          '100%': { top: '-100vh' },
        },
        slideIn: {
          '0%': { right: '-400px' },
          '100%': { right: 'calc(10vw - 20px)' },
        },
        slideOut: {
          '0%': { right: 'calc(10vw - 20px)' },
          '100%': { right: '-400px' },
        },
      },
    },
  },

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
});
