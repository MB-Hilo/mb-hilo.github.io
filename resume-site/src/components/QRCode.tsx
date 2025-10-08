'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeComponentProps {
  text: string;
  size?: number;
}

export default function QRCodeComponent({ text, size = 100 }: QRCodeComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).catch((err: Error) => {
      console.error('QR Code generation failed:', err);
    });
  }, [text, size]);

  return (
    <canvas 
      ref={canvasRef} 
      className="rounded"
    />
  );
}