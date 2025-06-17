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
        // Saffron Color for Buy Now buttons
        saffron: {
          50: '#fffbf0',
          100: '#fff6dc',
          200: '#ffedb3',
          300: '#ffe085',
          400: '#ffcc47',
          500: '#F5B000', // Main saffron color
          600: '#e6a100',
          700: '#cc8f00',
          800: '#b37d00',
          900: '#996b00',
        },
        // Emerald shades for medical themes
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#014421', // Deep emerald
          900: '#022c14',
        },
        // Additional theme colors
        maroon: {
          50: '#fdf2f7',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#8B1E3F', // Reddish maroon
          900: '#701a3a',
        },
        sage: {
          50: '#f8faf9',
          100: '#f1f5f2',
          200: '#e2ebe5',
          300: '#c8d6cc',
          400: '#9db5a3',
          500: '#7a9981',
          600: '#5d7864',
          700: '#4a5f50',
          800: '#3c4e42',
          900: '#324038',
          light: '#f1f5f2',
        },
        // Base colors
        ivory: '#fefdf8',
        charcoal: '#2c2c2c',
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