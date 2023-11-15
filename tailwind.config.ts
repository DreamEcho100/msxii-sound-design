import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        initial: {
          primary: {
            0: "rgba(var(--color-initial-primary-0) / <alpha-value>)",
            100: "rgba(var(--color-initial-primary-100) / <alpha-value>)",
            200: "rgba(var(--color-initial-primary-200) / <alpha-value>)",
            300: "rgba(var(--color-initial-primary-300) / <alpha-value>)",
            400: "rgba(var(--color-initial-primary-400) / <alpha-value>)",
            500: "rgba(var(--color-initial-primary-500) / <alpha-value>)",
            600: "rgba(var(--color-initial-primary-600) / <alpha-value>)",
            700: "rgba(var(--color-initial-primary-700) / <alpha-value>)",
            800: "rgba(var(--color-initial-primary-800) / <alpha-value>)",
            900: "rgba(var(--color-initial-primary-900) / <alpha-value>)",
            1000: "rgba(var(--color-initial-primary-1000) / <alpha-value>)",
          },
          secondary: {
            0: "rgba(var(--color-initial-primary-0) / <alpha-value>)",
            100: "rgba(var(--color-initial-primary-100) / <alpha-value>)",
            200: "rgba(var(--color-initial-primary-200) / <alpha-value>)",
            300: "rgba(var(--color-initial-primary-300) / <alpha-value>)",
            400: "rgba(var(--color-initial-primary-400) / <alpha-value>)",
            500: "rgba(var(--color-initial-primary-500) / <alpha-value>)",
            600: "rgba(var(--color-initial-primary-600) / <alpha-value>)",
            700: "rgba(var(--color-initial-primary-700) / <alpha-value>)",
            800: "rgba(var(--color-initial-primary-800) / <alpha-value>)",
            900: "rgba(var(--color-initial-primary-900) / <alpha-value>)",
            1000: "rgba(var(--color-initial-primary-1000) / <alpha-value>)",
          },
          ternary: {
            0: "rgba(var(--color-initial-ternary-0) / <alpha-value>)",
            100: "rgba(var(--color-initial-ternary-100) / <alpha-value>)",
            200: "rgba(var(--color-initial-ternary-200) / <alpha-value>)",
            300: "rgba(var(--color-initial-ternary-300) / <alpha-value>)",
            400: "rgba(var(--color-initial-ternary-400) / <alpha-value>)",
            500: "rgba(var(--color-initial-ternary-500) / <alpha-value>)",
            600: "rgba(var(--color-initial-ternary-600) / <alpha-value>)",
            700: "rgba(var(--color-initial-ternary-700) / <alpha-value>)",
            800: "rgba(var(--color-initial-ternary-800) / <alpha-value>)",
            900: "rgba(var(--color-initial-ternary-900) / <alpha-value>)",
            1000: "rgba(var(--color-initial-ternary-1000) / <alpha-value>)",
          },
        },

        text: {
          primary: {
            0: "rgba(var(--color-text-primary-0) / <alpha-value>)",
            100: "rgba(var(--color-text-primary-100) / <alpha-value>)",
            200: "rgba(var(--color-text-primary-200) / <alpha-value>)",
            300: "rgba(var(--color-text-primary-300) / <alpha-value>)",
            400: "rgba(var(--color-text-primary-400) / <alpha-value>)",
            500: "rgba(var(--color-text-primary-500) / <alpha-value>)",
            600: "rgba(var(--color-text-primary-600) / <alpha-value>)",
            700: "rgba(var(--color-text-primary-700) / <alpha-value>)",
            800: "rgba(var(--color-text-primary-800) / <alpha-value>)",
            900: "rgba(var(--color-text-primary-900) / <alpha-value>)",
            1000: "rgba(var(--color-text-primary-1000) / <alpha-value>)",
          },
        },
        bg: {
          primary: {
            0: "rgba(var(--color-bg-primary-0) / <alpha-value>)",
            100: "rgba(var(--color-bg-primary-100) / <alpha-value>)",
            200: "rgba(var(--color-bg-primary-200) / <alpha-value>)",
            300: "rgba(var(--color-bg-primary-300) / <alpha-value>)",
            400: "rgba(var(--color-bg-primary-400) / <alpha-value>)",
            500: "rgba(var(--color-bg-primary-500) / <alpha-value>)",
            600: "rgba(var(--color-bg-primary-600) / <alpha-value>)",
            700: "rgba(var(--color-bg-primary-700) / <alpha-value>)",
            800: "rgba(var(--color-bg-primary-800) / <alpha-value>)",
            900: "rgba(var(--color-bg-primary-900) / <alpha-value>)",
            1000: "rgba(var(--color-bg-primary-1000) / <alpha-value>)",
          },
        },
        special: {
          primary: {
            100: "rgba(var(--color-special-primary-100) / <alpha-value>)",
            200: "rgba(var(--color-special-primary-200) / <alpha-value>)",
            300: "rgba(var(--color-special-primary-300) / <alpha-value>)",
            400: "rgba(var(--color-special-primary-400) / <alpha-value>)",
            500: "rgba(var(--color-special-primary-500) / <alpha-value>)",
            600: "rgba(var(--color-special-primary-600) / <alpha-value>)",
            700: "rgba(var(--color-special-primary-700) / <alpha-value>)",
            800: "rgba(var(--color-special-primary-800) / <alpha-value>)",
            900: "rgba(var(--color-special-primary-900) / <alpha-value>)",
          },
          secondary: {
            100: "rgba(var(--color-special-secondary-100) / <alpha-value>)",
            200: "rgba(var(--color-special-secondary-200) / <alpha-value>)",
            300: "rgba(var(--color-special-secondary-300) / <alpha-value>)",
            400: "rgba(var(--color-special-secondary-400) / <alpha-value>)",
            500: "rgba(var(--color-special-secondary-500) / <alpha-value>)",
            600: "rgba(var(--color-special-secondary-600) / <alpha-value>)",
            700: "rgba(var(--color-special-secondary-700) / <alpha-value>)",
            800: "rgba(var(--color-special-secondary-800) / <alpha-value>)",
            900: "rgba(var(--color-special-secondary-900) / <alpha-value>)",
          },
        },

        //
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        "xl-3-sm": "250px",
        // // => @media (min-width: 250px) { ... }
        "xl-2-sm": "400px",
        // // => @media (min-width: 400px) { ... }
        "xl-sm": "512px",
        // => @media (min-width: 512px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        // ...defaultTheme,

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },

      fontFamily: {
        sans: ["var(--font-raleway)", ...fontFamily.sans],
      },
      fontSize: {
        h1: "var(--size-h1)",
        h2: "var(--size-h2)",
        h3: "var(--size-h3)",
        h4: "var(--size-h4)",
        h5: "var(--size-h5)",
        h6: "var(--size-h6)",
      },
      spacing: {
        "main-header-h": "var(--main-header-h)",
        h1: "var(--size-h1)",
        h2: "var(--size-h2)",
        h3: "var(--size-h3)",
        h4: "var(--size-h4)",
        h5: "var(--size-h5)",
        h6: "var(--size-h6)",
        "main-p-1": "var(--main-p-1)",
        "main-p-2": "var(--main-p-2)",
        "main-p-3": "var(--main-p-3)",
        "main-p-4": "var(--main-p-4)",
      },
      minHeight: {
        "main-content": "var(--main-content-min-h)",
      },
      maxWidth: {
        main: "var(--main-max-w)",
      },
      lineHeight: {
        h1: "var(--leading-h1)",
        h2: "var(--leading-h2)",
        "primary-1": "var(--leading-primary-1)",
        "primary-2": "var(--leading-primary-2)",
        "primary-3": "var(--leading-primary-3)",
        "primary-4": "var(--leading-primary-4)",
        "primary-5": "var(--leading-primary-5)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;
