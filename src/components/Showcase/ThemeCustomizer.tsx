"use client";

import React, { useState } from "react";
import { useTheme } from "@/app/ThemeProvider";
import { baseThemes, ThemeName } from "@/lib/themes";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { ColorWheel } from "../ui/ColorWheel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { hexToRgb, rgbToHex } from "@/lib/utils";
interface ColorSwatch {
  name: string;
  variable: string;
}

// Main color swatches to display in the customizer
const colorSwatches: ColorSwatch[] = [
  { name: "Background", variable: "background" },
  { name: "Foreground", variable: "foreground" },
  { name: "Primary", variable: "primary" },
  { name: "Secondary", variable: "secondary" },
  { name: "Accent", variable: "accent" },
  { name: "Muted", variable: "muted" },
  { name: "Destructive", variable: "destructive" },
  { name: "Card", variable: "card" },
  { name: "Border", variable: "border" },
];
interface ThemeCustomizerProps {
    className?:string;
}
export const ThemeCustomizer:React.FC<ThemeCustomizerProps> = ({className}) => {
  const { theme, mode, setTheme, customizeTheme, saveCurrentTheme, currentThemeValues } = useTheme();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'swatches' | 'wheel'>('swatches');
  
  // Reset to predefined theme
  const resetTheme = () => {
    setTheme(mode === 'light' ? 'light' : 'dark');
  };
  
  // Handle color input change from standard color input
  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedColor) return;
    
    const rgbValue = hexToRgb(e.target.value);
    customizeTheme(selectedColor, rgbValue);
  };
  
  // Handle color change from color wheel
  const handleColorWheelChange = (hexColor: string) => {
    if (!selectedColor) return;
    
    const rgbValue = hexToRgb(hexColor);
    customizeTheme(selectedColor, rgbValue);
  };
  
  // Get current hex color for selected variable
  const getCurrentHexColor = (): string => {
    if (!selectedColor || !currentThemeValues[selectedColor]) {
      return '#000000';
    }
    
    return rgbToHex(currentThemeValues[selectedColor]);
  };
  
  return (
    <Card className={className?className:""}>
      <CardHeader>
        <CardTitle>Theme Customizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <label>Base Theme:</label>
          <select 
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeName)}
            className="px-2 py-1 bg-card border border-border rounded-radius-md"
          >
            <optgroup label="System Themes">
              {Object.keys(baseThemes).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </option>
              ))}
            </optgroup>
            <optgroup label="Custom Themes">
              <option value="custom-light">Custom Light</option>
              <option value="custom-dark">Custom Dark</option>
            </optgroup>
          </select>
          <Button variant="outline" size="sm" onClick={resetTheme}>
            Reset Customizations
          </Button>
        </div>
        
        <Tabs defaultValue="swatches" onValueChange={(value) => setActiveTab(value as 'swatches' | 'wheel')}>
          <TabsList className="mb-4">
            <TabsTrigger value="swatches">Color Swatches</TabsTrigger>
            <TabsTrigger value="wheel">Color Wheel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="swatches" className="mt-0">
            <div className="grid grid-cols-3 gap-4">
              {colorSwatches.map((swatch) => (
                <div 
                  key={swatch.variable}
                  className="flex flex-col items-center gap-2"
                  onClick={() => setSelectedColor(swatch.variable)}
                >
                  <div 
                    className={`h-12 w-full rounded-radius-md cursor-pointer transition-all ${
                      selectedColor === swatch.variable ? 'ring-2 ring-primary scale-105' : ''
                    }`}
                    style={{ 
                      backgroundColor: `rgb(var(--${swatch.variable}))` 
                    }}
                  />
                  <span className="text-xs">{swatch.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="wheel" className="mt-0">
            <div className="flex justify-center">
              {selectedColor ? (
                <ColorWheel 
                  initialColor={getCurrentHexColor()}
                  size={240}
                  onChange={handleColorWheelChange}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-60 text-center">
                  <p className="text-muted-foreground">
                    Select a color from the swatches tab first
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => setActiveTab('swatches')}
                  >
                    Go to Swatches
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedColor && (
          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Editing: {colorSwatches.find(s => s.variable === selectedColor)?.name}
              </h4>
              
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={getCurrentHexColor()}
                  onChange={handleColorInputChange}
                  className="h-8 w-10"
                />
                <div 
                  className="h-8 w-8 rounded-radius-sm border border-border"
                  style={{ backgroundColor: getCurrentHexColor() }}
                />
              </div>
            </div>
            
            <div className="mt-2">
              <code className="text-xs bg-muted px-2 py-1 rounded-radius-sm">
                --{selectedColor}: {currentThemeValues[selectedColor] || ''}
              </code>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <Button 
          variant="outline" 
          onClick={() => saveCurrentTheme('custom-light')}
        >
          Save as Custom Light
        </Button>
        <Button 
          variant="outline" 
          onClick={() => saveCurrentTheme('custom-dark')}
        >
          Save as Custom Dark
        </Button>
      </CardFooter>
    </Card>
  );
}