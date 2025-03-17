"use client";

import React, { useRef, useEffect, useState } from 'react';

interface ColorWheelProps {
  initialColor?: string; // hex color
  size?: number;
  onChange?: (color: string) => void; // hex color
}

export function ColorWheel({ 
  initialColor = '#ff0000', 
  size = 200, 
  onChange 
}: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  
  // Draw the color wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 5;
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Draw hue wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = (angle + 1) * Math.PI / 180;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Set color based on hue angle
      ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.fill();
    }
    
    // Draw lightness/saturation gradient overlay
    const squareSize = radius * 1.4;
    const squareX = centerX - squareSize / 2;
    const squareY = centerY - squareSize / 2;
    
    // Create white to transparent gradient (horizontal)
    const gradientH = ctx.createLinearGradient(squareX, 0, squareX + squareSize, 0);
    gradientH.addColorStop(0, `hsla(${hue}, 100%, 50%, 0)`);
    gradientH.addColorStop(1, `hsla(${hue}, 100%, 50%, 1)`);
    
    // Create black to transparent gradient (vertical)
    const gradientV = ctx.createLinearGradient(0, squareY, 0, squareY + squareSize);
    gradientV.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradientV.addColorStop(1, 'rgba(0, 0, 0, 1)');
    
    // Create circular mask
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    
    // Draw indicator for current color selection
    const angle = hue * Math.PI / 180;
    const dist = (saturation / 100) * radius;
    const x = centerX + Math.cos(angle) * dist;
    const y = centerY + Math.sin(angle) * dist;
    
    // Draw indicator ring
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = lightness > 60 ? '#000000' : '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw inner circle with current color
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();
    
  }, [size, hue, saturation, lightness, currentColor]);
  
  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  // Convert Hex to HSL
  const hexToHsl = (hex: string): [number, number, number] => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse r, g, b components
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h = Math.round(h * 60);
    }
    
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return [h, s, l];
  };
  
  // Initialize from initial color
  useEffect(() => {
    if (initialColor) {
      const [h, s, l] = hexToHsl(initialColor);
      setHue(h);
      setSaturation(s);
      setLightness(l);
      setCurrentColor(initialColor);
    }
  }, [initialColor]);
  
  // Handle mouse/touch events
  const getColorFromPosition = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Calculate position relative to center
    const relX = x - rect.left - centerX;
    const relY = y - rect.top - centerY;
    
    // Calculate angle (hue)
    let angle = Math.atan2(relY, relX) * 180 / Math.PI;
    if (angle < 0) angle += 360;
    
    // Calculate distance from center (saturation)
    const distance = Math.sqrt(relX * relX + relY * relY);
    const maxDistance = size / 2 - 5;
    const saturationValue = Math.min(100, Math.max(0, (distance / maxDistance) * 100));
    
    setHue(angle);
    setSaturation(saturationValue);
    
    // Calculate new color
    const newColor = hslToHex(angle, saturationValue, lightness);
    setCurrentColor(newColor);
    
    if (onChange) {
      onChange(newColor);
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    getColorFromPosition(e.clientX, e.clientY);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    getColorFromPosition(e.clientX, e.clientY);
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    getColorFromPosition(e.touches[0].clientX, e.touches[0].clientY);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    getColorFromPosition(e.touches[0].clientX, e.touches[0].clientY);
  };
  
  const handleTouchEnd = () => {
    setIsDrawing(false);
  };
  
  // Handle lightness slider
  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLightness = parseInt(e.target.value);
    setLightness(newLightness);
    
    const newColor = hslToHex(hue, saturation, newLightness);
    setCurrentColor(newColor);
    
    if (onChange) {
      onChange(newColor);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <canvas 
        ref={canvasRef}
        width={size}
        height={size}
        className="cursor-pointer touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      
      <div className="w-full mt-4 flex items-center gap-2">
        <span className="text-xs">Brightness</span>
        <input 
          type="range"
          min="0"
          max="100"
          value={lightness}
          onChange={handleLightnessChange}
          className="w-full"
        />
        <div 
          className="h-6 w-6 rounded-radius-sm border border-border"
          style={{ backgroundColor: currentColor }}
        />
      </div>
    </div>
  );
}

