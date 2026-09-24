/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        raleway: "var(--font-raleway)",
        robotoSlab: "var(--font-roboto-slab)",
        inter: "var(--font-inter)",
      },
    },
  },
  plugins: [],
};
