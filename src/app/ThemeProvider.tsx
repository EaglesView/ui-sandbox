"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  ThemeName, 
  applyTheme, 
  injectBaseThemes, 
  baseThemes, 
  getSavedThemes,
  saveTheme 
} from "@/lib/themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
};

type ThemeMode = 'light' | 'dark';

type ThemeProviderState = {
  theme: ThemeName;
  mode: ThemeMode;
  setTheme: (theme: ThemeName) => void;
  customizeTheme: (colorKey: string, value: string) => void;
  saveCurrentTheme: (as: 'custom-light' | 'custom-dark') => void;
  currentThemeValues: Record<string, string>;
};

const initialState: ThemeProviderState = {
  theme: "light",
  mode: "light",
  setTheme: () => null,
  customizeTheme: () => null,
  saveCurrentTheme: () => null,
  currentThemeValues: {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);
  const [mode, setMode] = useState<ThemeMode>(defaultTheme.includes('dark') ? 'dark' : 'light');
  const [customThemeValues, setCustomThemeValues] = useState<Record<string, string>>({});

  // Initialize base themes once on first render
  useEffect(() => {
    injectBaseThemes();
  }, []);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as ThemeName | null;
    
    // Check for system preference if no saved theme
    if (!savedTheme) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = systemPrefersDark ? "dark" : "light";
      
      // Check if we have a custom theme for this mode
      const savedThemes = getSavedThemes();
      const customThemeForMode = systemPrefersDark ? 'custom-dark' : 'custom-light';
      
      if (savedThemes[customThemeForMode]) {
        setThemeState(customThemeForMode as ThemeName);
      } else {
        setThemeState(systemTheme as ThemeName);
      }
      
      setMode(systemPrefersDark ? 'dark' : 'light');
      return;
    }
    
    // Apply saved theme
    setThemeState(savedTheme);
    setMode(savedTheme.includes('dark') ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    // Apply theme when it changes
    applyTheme(theme);
    
    // Save theme choice to localStorage
    localStorage.setItem("theme", theme);
    
    // Update theme mode
    setMode(theme.includes('dark') ? 'dark' : 'light');
    
    // Reset custom theme values when theme changes
    setCustomThemeValues({});
  }, [theme]);
  
  useEffect(() => {
    // Apply custom theme values
    if (Object.keys(customThemeValues).length > 0) {
      applyTheme(customThemeValues);
    }
  }, [customThemeValues]);

  // Set theme function
  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };
  
  // Customize individual theme values on the fly
  const customizeTheme = (colorKey: string, value: string) => {
    setCustomThemeValues(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };
  
  // Save current theme setup as a custom theme
  const saveCurrentTheme = (as: 'custom-light' | 'custom-dark') => {
    // Get the current base theme values
    const baseThemeName = theme in baseThemes 
      ? theme 
      : mode === 'light' ? 'light' : 'dark';
      
    const baseValues = baseThemes[baseThemeName as keyof typeof baseThemes];
    
    // Merge with custom theme values
    const mergedValues = {
      ...baseValues,
      ...customThemeValues
    };
    
    // Save the theme
    saveTheme(as, mergedValues);
    
    // Apply the theme
    setThemeState(as);
  };
  
  // Get current theme values (base + custom)
  const getCurrentThemeValues = () => {
    // Get base theme
    let baseValues: Record<string, string> = {};
    
    if (theme in baseThemes) {
      baseValues = baseThemes[theme as keyof typeof baseThemes];
    } else {
      // For custom themes, get saved values
      const savedThemes = getSavedThemes();
      baseValues = savedThemes[theme as 'custom-light' | 'custom-dark'] || 
                  baseThemes[mode === 'light' ? 'light' : 'dark'];
    }
    
    // Merge with custom values
    return {
      ...baseValues,
      ...customThemeValues
    };
  };

  return (
    <ThemeProviderContext.Provider value={{ 
      theme, 
      mode,
      setTheme, 
      customizeTheme,
      saveCurrentTheme,
      currentThemeValues: getCurrentThemeValues()
    }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};