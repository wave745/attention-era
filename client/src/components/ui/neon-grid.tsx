import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface NeonGridProps {
  className?: string;
}

export function NeonGrid({ className = "" }: NeonGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isReducedMotion } = useReducedMotion();
  
  useEffect(() => {
    if (isReducedMotion) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
    };
    
    // Set initial size
    setCanvasSize();
    
    // Handle resize
    window.addEventListener('resize', setCanvasSize);
    
    // Grid properties
    const gridSize = 40;
    const lineWidth = 0.5;
    
    // Animation properties
    let time = 0;
    const speed = 0.1;
    
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += speed;
      
      // Draw horizontal grid lines
      for (let y = 0; y < canvas.height / window.devicePixelRatio; y += gridSize) {
        const yOffset = (y + time % gridSize);
        
        ctx.beginPath();
        ctx.moveTo(0, yOffset);
        ctx.lineTo(canvas.width, yOffset);
        
        // Gradient for horizontal lines
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.05)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0.05)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      
      // Draw vertical grid lines
      for (let x = 0; x < canvas.width / window.devicePixelRatio; x += gridSize) {
        const xOffset = (x + time % gridSize);
        
        ctx.beginPath();
        ctx.moveTo(xOffset, 0);
        ctx.lineTo(xOffset, canvas.height);
        
        // Gradient for vertical lines
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 0, 255, 0.05)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 0, 255, 0.05)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      
      // Add horizontal scan line
      const scanLineY = (time * 2) % (canvas.height / window.devicePixelRatio);
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(canvas.width, scanLineY);
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [isReducedMotion]);
  
  if (isReducedMotion) {
    // Simple static grid for reduced motion preference
    return (
      <div className={`absolute inset-0 pointer-events-none opacity-30 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/5 to-cyber-magenta/5"></div>
      </div>
    );
  }
  
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0 opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/5 to-cyber-magenta/5"></div>
    </motion.div>
  );
}