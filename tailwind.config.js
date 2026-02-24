import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom': '10002px',
      }
    },
  },
  plugins: [
    forms,
    typography,
    daisyui,
  ],
  daisyui: {
    themes: ['light', 'dark'],
  },
}
