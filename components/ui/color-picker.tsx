'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
}

const presetColors = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#64748b',
];

export function ColorPicker({ value = '#3b82f6', onChange, className }: ColorPickerProps) {
  const [color, setColor] = useState(value);
  const [hexInput, setHexInput] = useState(value);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setHexInput(newColor);
    onChange?.(newColor);
  };

  const handleHexInputChange = (hex: string) => {
    setHexInput(hex);
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      setColor(hex);
      onChange?.(hex);
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  };

  const rgb = hexToRgb(color);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('justify-start text-left font-normal', className)}>
          <div className="w-full flex items-center gap-2">
            <div className="h-4 w-4 rounded border" style={{ backgroundColor: color }} />
            <span className="flex-1 text-sm">{color.toUpperCase()}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className={cn(
                    'h-8 w-8 rounded border-2 transition-all hover:scale-110',
                    color === presetColor ? 'border-primary' : 'border-transparent',
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleColorChange(presetColor)}
                />
              ))}
            </div>

            <div className="space-y-2">
              <Label>Current Color</Label>
              <div className="h-12 w-full rounded border" style={{ backgroundColor: color }} />
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <Label>Hex</Label>
              <Input
                value={hexInput}
                onChange={(e) => handleHexInputChange(e.target.value)}
                placeholder="#000000"
                maxLength={7}
              />
            </div>

            {rgb && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Red</Label>
                    <span className="text-sm text-muted-foreground">{rgb.r}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleColorChange(rgbToHex(+e.target.value, rgb.g, rgb.b))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Green</Label>
                    <span className="text-sm text-muted-foreground">{rgb.g}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleColorChange(rgbToHex(rgb.r, +e.target.value, rgb.b))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Blue</Label>
                    <span className="text-sm text-muted-foreground">{rgb.b}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleColorChange(rgbToHex(rgb.r, rgb.g, +e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="h-12 w-full rounded border" style={{ backgroundColor: color }} />
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
