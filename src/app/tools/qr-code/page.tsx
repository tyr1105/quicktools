"use client";
import { useState, useRef, useEffect } from "react";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://quicktools.dev");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;
    // Simple QR generation using a canvas-based approach
    // Using the QR code algorithm inline (simplified version)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use a lightweight QR code generation approach
    try {
      const { default: QRCode } = await import("qrcode");
      canvas.width = size;
      canvas.height = size;
      await QRCode.toCanvas(canvas, text, { width: size, margin: 2, color: { dark: "#000000", light: "#ffffff" } });
    } catch {
      // Fallback: draw a placeholder
      canvas.width = size;
      canvas.height = size;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#000";
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Install qrcode package", size/2, size/2);
    }
  };

  useEffect(() => { generateQR(); }, [text, size]);

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
        <p className="text-gray-500">Generate QR codes from any text or URL. Download as PNG.</p>
      </div>
      <div className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Text or URL</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Enter text or URL" />
        </div>
        <div>
          <label className="flex justify-between text-sm font-medium mb-1"><span>Size</span><span>{size}px</span></label>
          <input type="range" min={128} max={512} value={size} onChange={e => setSize(Number(e.target.value))} className="w-full accent-brand-600" />
        </div>
        <div className="flex justify-center">
          <canvas ref={canvasRef} className="border rounded-lg" />
        </div>
        <button onClick={() => {
          const link = document.createElement("a");
          link.download = "qrcode.png";
          link.href = canvasRef.current?.toDataURL("image/png") || "";
          link.click();
        }} className="btn-primary w-full">Download PNG</button>
      </div>
    </div>
  );
}
