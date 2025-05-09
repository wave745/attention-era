import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!visible) {
        setVisible(true);
      }
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [visible]);

  // Hide cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null;
  }

  return (
    <motion.div
      className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-screen"
      style={{ 
        left: position.x,
        top: position.y,
        translateX: -16,
        translateY: -16,
      }}
      animate={{
        scale: clicking ? 0.8 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        scale: { type: "spring", stiffness: 500, damping: 28 },
        opacity: { duration: 0.2 }
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-cyber-cyan rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fas fa-eye text-cyber-cyan text-sm animate-eye-follow"></i>
        </div>
      </div>
    </motion.div>
  );
}
