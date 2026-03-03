/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#0CC8A8',
          hover: '#0AB596',
          light: '#E6FAF5',
          dark: '#0A3D35',
        },
        severity: {
          critical: '#EF4444',
          'critical-bg': '#FEF2F2',
          'critical-bg-dark': '#3B1111',
          high: '#F97316',
          'high-bg': '#FFF7ED',
          'high-bg-dark': '#3B2506',
          medium: '#EAB308',
          'medium-bg': '#FEFCE8',
          'medium-bg-dark': '#3B3506',
          low: '#22C55E',
          'low-bg': '#F0FDF4',
          'low-bg-dark': '#0B3D1A',
        },
        surface: {
          dark: '#0F0F0F',
          'dark-secondary': '#1A1A1A',
          'dark-tertiary': '#2A2A2A',
          'dark-card': '#1E1E1E',
          'dark-border': '#333333',
          light: '#FFFFFF',
          'light-secondary': '#F5F5F5',
          'light-tertiary': '#EBEBEB',
          'light-card': '#FFFFFF',
          'light-border': '#E5E7EB',
        },
        status: {
          completed: '#22C55E',
          'completed-bg': '#DCFCE7',
          'completed-bg-dark': '#0B3D1A',
          scheduled: '#9CA3AF',
          'scheduled-bg': '#F3F4F6',
          'scheduled-bg-dark': '#2A2A2A',
          failed: '#EF4444',
          'failed-bg': '#FEF2F2',
          'failed-bg-dark': '#3B1111',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
