"use client";
import { useState } from "react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return { r, g, b };
}
function rgbToHsl(r: number, g: number, b: number) {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min;
  let h=0, s=0, l=(max+min)/2;
  if(d>0){ s=l>0.5?d/(2-max-min):d/(max+min);
    if(max===r) h=((g-b)/d+(g<b?6:0))/6;
    else if(max===g) h=((b-r)/d+2)/6;
    else h=((r-g)/d+4)/6;
  }
  return { h:Math.round(h*360), s:Math.round(s*100), l:Math.round(l*100) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#4c6ef5");
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Color Converter</h1>
        <p className="text-gray-500">Convert colors between HEX, RGB, and HSL formats with live preview.</p>
      </div>
      <div className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pick a color</label>
          <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-24 h-24 rounded-lg cursor-pointer border-0" />
        </div>
        <div className="p-8 rounded-2xl border" style={{ backgroundColor: hex }}>
          <div className="text-center font-mono text-lg font-bold" style={{ color: hsl.l > 50 ? "#000" : "#fff" }}>{hex}</div>
        </div>
        <div className="space-y-2">
          {[["HEX", hex], ["RGB", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`], ["HSL", `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`]].map(([label, value]: any) => (
            <div key={label} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <span className="text-sm font-medium">{label}</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono">{value}</code>
                <button onClick={() => navigator.clipboard.writeText(value)} className="text-xs text-brand-600 hover:underline">Copy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
