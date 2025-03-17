import { ThemeConfig, baseTheme } from "./theme-config";
/**
 * Light theme basic
 */
export const lightTheme: ThemeConfig = {
  name: "light",
  ...baseTheme,
  colors: {
    background: "#ffffff",
    foreground: "#171717", 
    primary: {
      DEFAULT: "#0070f3",
      foreground: "#ffffff",
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
    secondary: {
      DEFAULT: "#6b7280",
      foreground: "#ffffff",
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    muted: {
      DEFAULT: "#f3f4f6",
      foreground: "#6b7280",
    },
    accent: {
      DEFAULT: "#8b5cf6",
      foreground: "#ffffff",
    },
    destructive: {
      DEFAULT: "#ef4444",
      foreground: "#ffffff",
    },
    border: "#e5e7eb",
    card: {
      DEFAULT: "#ffffff",
      foreground: "#171717",
    },
    input: "#e5e7eb",
  },
};
/**
 * Dark theme basic
 */
export const darkTheme: ThemeConfig = {
  name: "dark-purple",
  ...baseTheme,
  colors: {
    background: "#0a0a0a",
    foreground: "#ededed",
    primary: {
      DEFAULT: "#0ea5e9",
      foreground: "#ffffff",
      50: "#0c4a6e",
      100: "#075985",
      200: "#0369a1",
      300: "#0284c7",
      400: "#0ea5e9",
      500: "#38bdf8",
      600: "#7dd3fc",
      700: "#bae6fd",
      800: "#e0f2fe",
      900: "#f0f9ff",
    },
    secondary: {
      DEFAULT: "#9ca3af",
      foreground: "#ffffff",
      50: "#111827",
      100: "#1f2937",
      200: "#374151",
      300: "#4b5563",
      400: "#6b7280",
      500: "#9ca3af",
      600: "#d1d5db",
      700: "#e5e7eb",
      800: "#f3f4f6",
      900: "#f9fafb",
    },
    muted: {
      DEFAULT: "#111827",
      foreground: "#9ca3af",
    },
    accent: {
      DEFAULT: "#a78bfa",
      foreground: "#ffffff",
    },
    destructive: {
      DEFAULT: "#f87171",
      foreground: "#ffffff",
    },
    border: "#374151",
    card: {
      DEFAULT: "#1f2937",
      foreground: "#ededed",
    },
    input: "#374151",
  },
};
/**
 * Dark theme Purple
 */
export const darkThemePurple: ThemeConfig = {
    name: "dark",
    ...baseTheme,
    colors: {
      background: "#0C030E",
      foreground: "#C5B8C8",
      primary: {
        DEFAULT: "#812c9d",
        foreground: "#eedaf5",
        50: "#70238a",
        100: "#812c9d",
        200: "#9033af",
        300: "#a541c6",
        400: "#aa4dc9",
        500: "#b564cf",
        600: "#c688da",
        700: "#dab2e7",
        800: "#eedaf5",
        900: "#faeefe",
      },
      secondary: {
        DEFAULT: "#c74391",
        foreground: "#d988b8",
        50: "#8a2361",
        100: "#9d2e70",
        200: "#b0357d",
        300: "#c74391",
        400: "#c94f97",
        500: "#cf64a4",
        600: "#d988b8",
        700: "#e5b3d1",
        800: "#f1dbe8",
        900: "#fbeff6",
      },
      muted: {
        DEFAULT: "#1f2937",
        foreground: "#9ca3af",
      },
      accent: {
        DEFAULT: "#a78bfa",
        foreground: "#ffffff",
      },
      destructive: {
        DEFAULT: "#f87171",
        foreground: "#ffffff",
      },
      border: "#374151",
      card: {
        DEFAULT: "#1f2937",
        foreground: "#ededed",
      },
      input: "#374151",
    },
  };

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  darkpurple:darkThemePurple,
};

export type ThemeName = keyof typeof themes;