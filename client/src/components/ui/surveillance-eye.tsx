import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface SurveillanceEyeProps {
  className?: string;
  size?: number;
  color?: string;
  pulseColor?: string;
}

export function SurveillanceEye({
  className = "",
  size = 48,
  color = "#00FFFF",
  pulseColor = "#FF00FF"
}: SurveillanceEyeProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initialize window size
    handleResize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate rotation based on mouse position
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;

    // Calculate rotation angle based on mouse position relative to center
    const maxRotation = 15; // Maximum rotation in degrees
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    
    // Normalize to -1 to 1 range
    const normalizedX = (mousePosition.x - centerX) / (windowSize.width / 2);
    const normalizedY = (mousePosition.y - centerY) / (windowSize.height / 2);
    
    // Apply maxRotation factor
    rotateY.set(normalizedX * maxRotation);
    rotateX.set(-normalizedY * maxRotation); // Inverted to make eye look toward cursor
  }, [mousePosition, windowSize, rotateX, rotateY]);

  // Iris movement is subtler than overall rotation
  const irisX = useTransform(rotateY, [-15, 15], [-4, 4]);
  const irisY = useTransform(rotateX, [-15, 15], [-4, 4]);

  return (
    <div className={`${className} fixed z-50 pointer-events-none`} style={{ width: size, height: size }}>
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
      >
        {/* Outer eye container */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Pulsing Glow Effect */}
          <motion.circle 
            cx="12" 
            cy="12" 
            r="11" 
            fill="none"
            stroke={pulseColor}
            strokeWidth="0.5"
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2], 
              scale: [1, 1.1, 1],
              strokeWidth: [0.5, 1, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          />
          
          {/* Eye outline */}
          <motion.circle 
            cx="12" 
            cy="12" 
            r="10" 
            stroke={color} 
            strokeWidth="1"
            fill="rgba(0,0,0,0.6)"
          />
          
          {/* Wiring/circuitry lines */}
          <motion.path 
            d="M3 12h3M18 12h3M12 3v3M12 18v3" 
            stroke={color} 
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Iris container */}
          <motion.circle 
            cx="12" 
            cy="12" 
            r="6" 
            stroke={color} 
            strokeWidth="0.5"
            fill="rgba(0,0,0,0.4)"
          />
          
          {/* Iris that follows mouse */}
          <motion.circle 
            cx="12" 
            cy="12" 
            r="3" 
            fill={color}
            style={{ 
              translateX: irisX,
              translateY: irisY,
            }}
          />
          
          {/* Pupil */}
          <motion.circle 
            cx="12" 
            cy="12" 
            r="1.5" 
            fill="black"
            style={{ 
              translateX: irisX,
              translateY: irisY,
            }}
          />
          
          {/* Scan line */}
          <motion.line 
            x1="2" 
            y1="12" 
            x2="22" 
            y2="12" 
            stroke={color} 
            strokeWidth="0.15"
            initial={{ translateY: -8 }}
            animate={{ translateY: 8 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 1.5, 
              ease: "linear" 
            }}
          />
          
          {/* Random blinking */}
          <motion.circle 
            cx="12" 
            cy="12" 
            r="10.5" 
            stroke={color} 
            strokeWidth="0.5"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatDelay: Math.random() * 4 + 2, 
              duration: 0.15, 
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}