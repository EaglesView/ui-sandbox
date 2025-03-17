export type ThemeColors = {
    background: string;
    foreground: string;
    primary: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    secondary: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    muted: {
      DEFAULT: string;
      foreground: string;
    };
    accent: {
      DEFAULT: string;
      foreground: string;
    };
    destructive: {
      DEFAULT: string;
      foreground: string;
    };
    border: string;
    card: {
      DEFAULT: string;
      foreground: string;
    };
    input: string;
  };
  
  export type ThemeRadius = {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  
  export type ThemeFontSizes = {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  
  export type ThemeFontWeights = {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  
  export type ThemeSpacing = {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
  };
  
  export type ThemeAnimation = {
    DEFAULT: string;
    fast: string;
    slow: string;
  };
  
  export type ThemeConfig = {
    name: string;
    colors: ThemeColors;
    borderRadius: ThemeRadius;
    fontSizes: ThemeFontSizes;
    fontWeights: ThemeFontWeights;
    spacing: ThemeSpacing;
    animation: ThemeAnimation;
  };
  
  export const baseTheme: Omit<ThemeConfig, 'name' | 'colors'> = {
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
    },
    animation: {
      DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  };