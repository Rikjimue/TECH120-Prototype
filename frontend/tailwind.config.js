/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#ffffff", // Light background
        foreground: "#000000", // Dark text for readability in light mode
        primary: {
          DEFAULT: "#1d4ed8", // Blue or any primary color for accents
          foreground: "#ffffff", // Text color for primary buttons
        },
        secondary: {
          DEFAULT: "#e2e8f0", // Light gray for secondary elements
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#f1f5f9", // Muted background
          foreground: "#374151", // Darker gray for readability
        },
        border: "#d1d5db", // Light border for light mode
        input: "#ffffff", // Input fields background
        ring: "#1d4ed8", // Ring color for focus
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
