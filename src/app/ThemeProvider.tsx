"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeName, themes } from "@/lib/themes";
import { ThemeConfig } from "@/lib/theme-config";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
};

type ThemeProviderState = {
  theme: ThemeName;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeName) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  themeConfig: themes.light,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(themes[defaultTheme]);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as ThemeName | null;
    
    // Check for system preference if no saved theme
    if (!savedTheme) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "darkpurple"
        : "light";
      setTheme(systemTheme);
      return;
    }
    
    // Apply saved theme
    if (savedTheme in themes) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme config when theme changes
    setThemeConfig(themes[theme]);
    
    // Save theme choice to localStorage
    localStorage.setItem("theme", theme);
    
    // Update document class for styling
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    
    // Also set HTML attribute for clarity
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = {
    theme,
    themeConfig,
    setTheme: (newTheme: ThemeName) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
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