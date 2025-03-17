// src/lib/theme.ts
export type ThemeColors = 
  | 'background'
  | 'foreground'
  | 'primary'
  | 'primary-foreground'
  | 'secondary'
  | 'secondary-foreground'
  | 'muted'
  | 'muted-foreground'
  | 'accent'
  | 'accent-foreground'
  | 'destructive'
  | 'destructive-foreground'
  | 'border'
  | 'card'
  | 'card-foreground'
  | 'input';

type ThemeValues = Record<string, string>;

// Define base themes (these are the only themes defined directly)
export const baseThemes = {
  light: {
    'background': '255 255 255',
    'foreground': '23 23 23',
    'primary': '0 112 243',
    'primary-foreground': '255 255 255',
    'secondary': '107 114 128',
    'secondary-foreground': '255 255 255',
    'muted': '243 244 246',
    'muted-foreground': '107 114 128',
    'accent': '139 92 246',
    'accent-foreground': '255 255 255',
    'destructive': '239 68 68',
    'destructive-foreground': '255 255 255',
    'border': '229 231 235',
    'card': '255 255 255',
    'card-foreground': '23 23 23',
    'input': '229 231 235',
  },
  dark: {
    'background': '10 10 10',
    'foreground': '237 237 237',
    'primary': '14 165 233',
    'primary-foreground': '255 255 255',
    'secondary': '156 163 175',
    'secondary-foreground': '255 255 255',
    'muted': '31 41 55',
    'muted-foreground': '156 163 175',
    'accent': '167 139 250',
    'accent-foreground': '255 255 255',
    'destructive': '248 113 113',
    'destructive-foreground': '255 255 255',
    'border': '55 65 81',
    'card': '31 41 55',
    'card-foreground': '237 237 237',
    'input': '55 65 81',
  },
  darkpurple: {
    'background': '12 3 14',
    'foreground': '197 184 200',
    'primary': '129 44 157',
    'primary-foreground': '238 218 245',
    'secondary': '199 67 145',
    'secondary-foreground': '217 136 184',
    'muted': '31 41 55',
    'muted-foreground': '156 163 175',
    'accent': '167 139 250',
    'accent-foreground': '255 255 255',
    'destructive': '248 113 113',
    'destructive-foreground': '255 255 255',
    'border': '55 65 81',
    'card': '31 41 55',
    'card-foreground': '237 237 237',
    'input': '55 65 81',
  }
};

// This function injects the base themes as CSS
export function injectBaseThemes() {
  // Only run in browser environment
  if (typeof document === 'undefined') return;
  
  // Create a style element
  const style = document.createElement('style');
  
  // Generate CSS for each theme
  let css = ':root {';
  
  // Add default light theme variables to :root
  Object.entries(baseThemes.light).forEach(([key, value]) => {
    css += `\n  --${key}: ${value};`;
  });
  css += '\n}\n';
  
  // Add other themes as CSS classes
  Object.entries(baseThemes).forEach(([themeName, themeValues]) => {
    if (themeName === 'light') return; // Skip light theme as it's already in :root
    
    css += `\n.${themeName} {`;
    Object.entries(themeValues).forEach(([key, value]) => {
      css += `\n  --${key}: ${value};`;
    });
    css += '\n}\n';
  });
  
  // Set the CSS content
  style.textContent = css;
  
  // Append to head
  document.head.appendChild(style);
}

// Extending base themes with custom themes
export type ThemeName = 
  | keyof typeof baseThemes 
  | 'custom-light' 
  | 'custom-dark';

// Get locally saved custom themes
export function getSavedThemes(): Record<string, ThemeValues> {
  if (typeof window === 'undefined') return {};
  
  const customLight = localStorage.getItem('custom-light-theme');
  const customDark = localStorage.getItem('custom-dark-theme');
  
  return {
    'custom-light': customLight ? JSON.parse(customLight) : null,
    'custom-dark': customDark ? JSON.parse(customDark) : null
  };
}

// Save a custom theme
export function saveTheme(name: 'custom-light' | 'custom-dark', values: ThemeValues) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(`${name}-theme`, JSON.stringify(values));
}

// Apply theme by directly setting CSS variables
export function applyTheme(theme: ThemeName | ThemeValues) {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const savedThemes = getSavedThemes();
  
  // Apply a named theme
  if (typeof theme === 'string') {
    // Get theme values - either from base themes or saved custom themes
    let themeValues: ThemeValues | null = null;
    
    if (theme in baseThemes) {
      themeValues = baseThemes[theme as keyof typeof baseThemes];
    } else if (theme === 'custom-light' && savedThemes['custom-light']) {
      themeValues = savedThemes['custom-light'];
    } else if (theme === 'custom-dark' && savedThemes['custom-dark']) {
      themeValues = savedThemes['custom-dark'];
    } else {
      // Fallback to light or dark theme
      themeValues = baseThemes[theme.includes('dark') ? 'dark' : 'light'];
    }
    
    if (!themeValues) return;
    
    // Apply each CSS variable
    Object.entries(themeValues).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Set data attribute for any CSS selectors that need it
    root.setAttribute('data-theme', theme);
    
    // Remove all theme classes and add the current one
    root.classList.remove(...Object.keys(baseThemes), 'custom-light', 'custom-dark');
    root.classList.add(theme);
    
    return;
  }
  
  // Apply custom theme values directly
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}