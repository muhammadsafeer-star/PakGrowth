/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paknavy: {
          900: '#070C1E',
          800: '#0A1128',
          700: '#101935',
          600: '#1A254B',
          500: '#263566',
        },
        electric: {
          500: '#0284C7',
          600: '#0078D4',
          700: '#005A9E',
        },
        pakcyan: {
          400: '#38BDF8',
          500: '#00B4D8',
          600: '#00E5FF',
        },
        pakscore: {
          critical: '#EF4444',
          needs: '#F59E0B',
          good: '#10B981',
          strong: '#0284C7',
          excellent: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(0, 120, 212, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(0, 180, 216, 0.3)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
};
