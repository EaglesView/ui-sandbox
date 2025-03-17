"use client";

import { rgbToHex } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

export interface ColorSwatchProps {
  name?: string;
  variable?: string;
  onClick?: () => void;
  selected?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  name, 
  variable = "primary",
  onClick,
  selected = false
}) => {
  const [hexColor, setHexColor] = useState<string>("");
  const [copied, setCopied] = useState(false);
  
  // Get the computed RGB value and convert to hex
  useEffect(() => {
    // This needs to run on client-side
    if (typeof window !== 'undefined') {
      // Get the computed style
      const rootStyle = getComputedStyle(document.documentElement);
      const rgbValue = rootStyle.getPropertyValue(`--${variable}`).trim();
      
      // Convert RGB to hex
      if (rgbValue) {
        const hex = rgbToHex(rgbValue);
        setHexColor(hex);
      }
    }
  }, [variable]);
  
  // Convert the "r g b" format to hex
  
  
  // Copy to clipboard
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick
    
    if (hexColor) {
      navigator.clipboard.writeText(hexColor);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  
  // Determine if text should be dark or light based on background color
  const shouldUseDarkText = () => {
    try {
      // Convert hex to RGB
      const hex = hexColor.replace('#', '');
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      
      // Calculate relative luminance using the formula
      // https://www.w3.org/TR/WCAG20/#relativeluminancedef
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      
      // Return true if the color is bright (should use dark text)
      return luminance > 128;
    } catch (e) {
      return false;
    }
  };
  
  const displayName = name || variable.charAt(0).toUpperCase() + variable.slice(1);
  
  return (
    <div 
      className="flex flex-col gap-2 col-span-1"
      onClick={onClick}
    >
      <div 
        className={`
          h-20 rounded-radius-md
          duration-100 transition-all relative
          cursor-pointer group
          ${selected ? 'ring-2 ring-primary scale-105' : ''}
          hover:ring hover:ring-offset-accent hover:ring-offset-2 active:ring-offset-4
        `}
        style={{ backgroundColor: `rgb(var(--${variable}))` }}
      >
        {/* Hex Value Display */}
        <div 
          className={`
            absolute inset-0 flex items-center justify-center
            text-4xl font-mono font-light
            opacity-50 group-hover:opacity-100 transition-opacity
            ${shouldUseDarkText() ? 'text-black/40' : 'text-white/40'}
          `}
          onClick={copyToClipboard}
        >
          {copied ? 'Copied!' : (hexColor.toUpperCase())}
        </div>
        
        {/* Copy button that appears on hover */}
        <button 
          onClick={copyToClipboard}
          className={`
            absolute bottom-2 right-2
            bg-black/20 bg-opacity-30 hover:bg-opacity-50
            text-white rounded-radius-full p-1
            opacity-0 group-hover:opacity-100 transition-opacity
            text-xs
          `}
          aria-label="Copy color to clipboard"
        >
          {copied ? '✓' : 'Copy'}
        </button>
      </div>
      <p className="text-sm font-medium">{displayName}</p>
    </div>
  );
};

export default ColorSwatch;