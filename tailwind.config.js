/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          background: 'rgb(var(--background) / <alpha-value>)',
          foreground: 'rgb(var(--foreground) / <alpha-value>)',
          primary: {
            DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
            foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
            50: 'rgb(var(--primary-50) / <alpha-value>)',
            100: 'rgb(var(--primary-100) / <alpha-value>)',
            200: 'rgb(var(--primary-200) / <alpha-value>)',
            300: 'rgb(var(--primary-300) / <alpha-value>)',
            400: 'rgb(var(--primary-400) / <alpha-value>)',
            500: 'rgb(var(--primary-500) / <alpha-value>)',
            600: 'rgb(var(--primary-600) / <alpha-value>)',
            700: 'rgb(var(--primary-700) / <alpha-value>)',
            800: 'rgb(var(--primary-800) / <alpha-value>)',
            900: 'rgb(var(--primary-900) / <alpha-value>)',
          },
          secondary: {
            DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
            foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
            50: 'rgb(var(--secondary-50) / <alpha-value>)',
            100: 'rgb(var(--secondary-100) / <alpha-value>)',
            200: 'rgb(var(--secondary-200) / <alpha-value>)',
            300: 'rgb(var(--secondary-300) / <alpha-value>)',
            400: 'rgb(var(--secondary-400) / <alpha-value>)',
            500: 'rgb(var(--secondary-500) / <alpha-value>)',
            600: 'rgb(var(--secondary-600) / <alpha-value>)',
            700: 'rgb(var(--secondary-700) / <alpha-value>)',
            800: 'rgb(var(--secondary-800) / <alpha-value>)',
            900: 'rgb(var(--secondary-900) / <alpha-value>)',
          },
          muted: {
            DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
            foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
          },
          accent: {
            DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
            foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
          },
          destructive: {
            DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
            foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
          },
          card: {
            DEFAULT: 'rgb(var(--card) / <alpha-value>)',
            foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
          },
          border: 'rgb(var(--border) / <alpha-value>)',
          input: 'rgb(var(--input) / <alpha-value>)',
        },
        borderRadius: {
          'radius-sm': 'var(--radius-sm)',
          'radius-md': 'var(--radius-md)',
          'radius-lg': 'var(--radius-lg)',
          'radius-full': 'var(--radius-full)',
        },
        fontFamily: {
          sans: ['var(--font-sans)'],
          mono: ['var(--font-mono)'],
        },
        transitionProperty: {
          'default': 'var(--animation-default)',
          'fast': 'var(--animation-fast)',
          'slow': 'var(--animation-slow)',
        }
      },
    },
    plugins: [],
  }