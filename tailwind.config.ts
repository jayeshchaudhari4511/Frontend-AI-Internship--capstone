import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          foreground: "hsl(var(--color-muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--color-card))",
          border: "hsl(var(--color-card-border))"
        },
        border: "hsl(var(--color-border))",
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          foreground: "hsl(var(--color-primary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent))",
          foreground: "hsl(var(--color-accent-foreground))"
        }
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"]
      },
      fontSize: {
        "display-sm": [
          "var(--text-display-sm)",
          { lineHeight: "var(--leading-display-sm)" }
        ],
        "display-md": [
          "var(--text-display-md)",
          { lineHeight: "var(--leading-display-md)" }
        ],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }]
      }
    }
  },
  plugins: []
};

export default config;
