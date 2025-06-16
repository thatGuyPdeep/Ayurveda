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
        // Ayurvedic Brand Colors
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd18d',
          400: '#5cb85c',
          500: '#1B5E20', // Main brand green
          600: '#155017',
          700: '#114013',
          800: '#0e3310',
          900: '#0c2a0d',
        },
        secondary: {
          50: '#fffbf0',
          100: '#fff6dc',
          200: '#ffecb8',
          300: '#ffdd85',
          400: '#ffc947',
          500: '#FFB300', // Golden accent
          600: '#e6a100',
          700: '#cc8f00',
          800: '#b37d00',
          900: '#996b00',
        },
        // UI Colors
        background: '#fefdf8', // Warm cream
        foreground: '#1a1a1a',
        card: '#ffffff',
        'card-foreground': '#1a1a1a',
        popover: '#ffffff',
        'popover-foreground': '#1a1a1a',
        muted: '#f5f5f0',
        'muted-foreground': '#6b7280',
        accent: '#f0f9f0',
        'accent-foreground': '#1B5E20',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        border: '#e5e7eb',
        input: '#ffffff',
        ring: '#1B5E20',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}

export default config 