import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [onLink, setOnLink] = useState(false);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const maxTrails = 10;
  const glyphsArray = ['×', '○', '□', '△', '◊', '⌘', '*', '+', '☢', '⚠'];
  
  // Create array for trails
  useEffect(() => {
    // Create trail elements
    const trailContainer = document.createElement('div');
    trailContainer.classList.add('trail-container');
    document.body.appendChild(trailContainer);
    
    // Create glyph element
    const glyphElement = document.createElement('div');
    glyphElement.classList.add('cursor-glyph');
    glyphElement.textContent = glyphsArray[Math.floor(Math.random() * glyphsArray.length)];
    document.body.appendChild(glyphElement);
    
    for (let i = 0; i < maxTrails; i++) {
      const trail = document.createElement('div');
      trail.classList.add('cursor-trail');
      trail.style.opacity = `${0.5 - (i * 0.05)}`;
      trail.style.width = `${Math.max(4, 12 - i)}px`;
      trail.style.height = `${Math.max(4, 12 - i)}px`;
      trailContainer.appendChild(trail);
      trailsRef.current.push(trail);
    }
    
    return () => {
      document.body.removeChild(trailContainer);
      document.body.removeChild(glyphElement);
    };
  }, []);

  useEffect(() => {
    // Mouse positions history for trails
    const positions: { x: number, y: number }[] = [];
    
    const updatePosition = (e: MouseEvent) => {
      // Update current position
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!visible) {
        setVisible(true);
      }
      
      // Add current position to history
      positions.unshift({ x: e.clientX, y: e.clientY });
      
      // Trim history to maxTrails length
      if (positions.length > maxTrails) {
        positions.length = maxTrails;
      }
      
      // Update trail positions
      trailsRef.current.forEach((trail, i) => {
        if (positions[i]) {
          trail.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        }
      });
      
      // Update glyph position
      const glyphElement = document.querySelector('.cursor-glyph');
      if (glyphElement) {
        glyphElement.setAttribute('style', `left: ${e.clientX}px; top: ${e.clientY}px;`);
      }
      
      // Check if cursor is over a link
      const target = e.target as HTMLElement;
      const isLink = target.tagName === 'A' || 
                    target.tagName === 'BUTTON' || 
                    target.closest('a') !== null || 
                    target.closest('button') !== null;
      
      setOnLink(isLink);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    // Change glyph randomly every 3 seconds
    const glyphInterval = setInterval(() => {
      const glyphElement = document.querySelector('.cursor-glyph');
      if (glyphElement) {
        glyphElement.textContent = glyphsArray[Math.floor(Math.random() * glyphsArray.length)];
      }
    }, 3000);
    
    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      clearInterval(glyphInterval);
    };
  }, [visible]);

  // Hide cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null;
  }

  return (
    <motion.div
      className="cursor-eye"
      style={{ 
        left: position.x,
        top: position.y,
      }}
      animate={{
        scale: clicking ? 0.8 : 1,
        opacity: visible ? 1 : 0,
        backgroundColor: onLink ? 'rgba(255, 0, 255, 0.3)' : 'rgba(0, 255, 255, 0.3)'
      }}
      transition={{
        scale: { type: "spring", stiffness: 500, damping: 28 },
        opacity: { duration: 0.2 },
        backgroundColor: { duration: 0.3 }
      }}
    >
      <div className="relative w-full h-full">
        <div className={`absolute inset-0 rounded-full ${onLink ? 'bg-cyber-magenta' : 'bg-cyber-cyan'} opacity-20 animate-pulse`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className={`fas ${onLink ? 'fa-crosshairs' : 'fa-eye'} ${onLink ? 'text-cyber-magenta' : 'text-cyber-cyan'} text-sm animate-eye-follow`}></i>
        </div>
      </div>
    </motion.div>
  );
}
