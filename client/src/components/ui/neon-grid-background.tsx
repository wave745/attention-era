import React, { useEffect, useRef } from 'react';

interface NeonGridBackgroundProps {
  className?: string;
}

export function NeonGridBackground({ className = "" }: NeonGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Grid properties
    const gridSize = 40;
    const lineWidth = 0.5;
    
    // Colors
    const colors = [
      { r: 0, g: 255, b: 255 },   // Cyan
      { r: 255, g: 0, b: 102 },   // Magenta
      { r: 0, g: 255, b: 0 }      // Green
    ];

    let animationFrame: number;
    let time = 0;

    // Draw the grid with neon effect
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create perspective grid
      const horizonY = canvas.height * 0.5;
      const vanishingPointX = canvas.width * 0.5;
      
      // Grid lines
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        // Vertical lines
        const relativeX = x - vanishingPointX;
        const gradientOpacity = Math.max(0, 1 - Math.abs(relativeX) / (canvas.width * 0.5));
        
        const color = colors[Math.floor(x / gridSize) % colors.length];
        const pulseOffset = Math.sin(time * 0.001 + x * 0.01) * 0.2 + 0.8;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${gradientOpacity * 0.2 * pulseOffset})`;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        
        // Create glow effect for some lines
        if (x % (gridSize * 4) === 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${gradientOpacity * 0.1 * pulseOffset})`;
          ctx.lineWidth = 4;
          ctx.shadowColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
          ctx.shadowBlur = 10;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
      
      // Horizontal perspective lines
      for (let y = horizonY; y < canvas.height + gridSize; y += gridSize) {
        const normalizedY = (y - horizonY) / (canvas.height - horizonY);
        const gradientOpacity = Math.min(1, normalizedY * 1.5);
        
        const perspectiveScale = Math.pow(normalizedY, 0.8);
        
        const color = colors[Math.floor(y / gridSize) % colors.length];
        const pulseOffset = Math.sin(time * 0.001 + y * 0.02) * 0.2 + 0.8;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${gradientOpacity * 0.2 * pulseOffset})`;
        ctx.lineWidth = lineWidth;
        
        // Perspective effect - lines converge to vanishing point
        const leftX = vanishingPointX - (vanishingPointX) * perspectiveScale;
        const rightX = vanishingPointX + (canvas.width - vanishingPointX) * perspectiveScale;
        
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
        
        // Glow effect for some horizontal lines
        if (y % (gridSize * 4) === 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${gradientOpacity * 0.1 * pulseOffset})`;
          ctx.lineWidth = 3;
          ctx.shadowColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
          ctx.shadowBlur = 8;
          ctx.moveTo(leftX, y);
          ctx.lineTo(rightX, y);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
      
      // Random light pulses
      if (Math.random() > 0.95) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 5 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
        ctx.shadowColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.shadowBlur = 20;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      time++;
      animationFrame = requestAnimationFrame(draw);
    };
    
    draw();
    
    // Clean up 
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 z-0 opacity-30 ${className}`}
      style={{ 
        pointerEvents: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.95)'
      }}
    />
  );
}